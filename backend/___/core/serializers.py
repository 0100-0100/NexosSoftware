from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.core.cache import cache
from django.urls import reverse
from django.utils.encoding import smart_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import CoreUser
from .utils import send_normal_email


class CoreUserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=3, write_only=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CoreUser.objects.all())]
    )

    class Meta:
        model = CoreUser
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Passwords didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = CoreUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username'),
            password=validated_data.get('password')
        )

        user.set_password(validated_data['password'])
        user.save()
        return user


class CoreUserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=68, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = CoreUser
        fields = [
            'email', 'username', 'password', 'access_token', 'refresh_token'
        ]

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again.')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified.')

        user_tokens = user.tokens()

        return {
            'email': user.email,
            'username': user.username,
            'access_token': str(user_tokens.get('access')),
            'refresh_token': str(user_tokens.get('refresh'))
        }


class ForgotMyPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=50)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        CoreUser.objects.get(email=email)
        return attrs

    def create(self, validated_data):
        user = CoreUser.objects.get(email=validated_data['email'])
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        absolute_link = (
            f"http://localhost/confirm-forgot-my-password/{uidb64}/{token}"
        )
        email_body = f"""
        Hi!

        Here's your password reset link:

        {absolute_link}
        """
        data = {
            'email_body': email_body,
            'email_subject': "Here's your password reset link",
            'to_email': user.email
        }
        send_normal_email(data)
        return user


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    class Meta:
        fields = ['password', 'confirm_password', 'uidb64', 'token']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            confirm_password = attrs.get('confirm_password')
            uidb64 = attrs.get('uidb64')
            token = attrs.get('token')

            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = CoreUser.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('Reset link is invalid or has expired.', 401)
            if password != confirm_password:
                raise AuthenticationFailed('Passwords do not match.', 400)
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            print(e)
            raise AuthenticationFailed('Error Validating your reset link.', 500)


class LogoutUserSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Invalid or expired token.')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh')
        return attrs

    def save(self, **kw):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad_token')
