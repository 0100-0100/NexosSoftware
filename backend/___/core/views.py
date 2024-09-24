from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.cache import cache
from django.shortcuts import render, redirect
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
# from rest_framework.views import APIView

from . import serializers
from .models import CoreUser, OneTimePassword
from .utils import send_otp_code_to_user

import time


class TestGetUsersEndpoint(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = CoreUser.objects.all()
        response = [{
            'user_id': user.id,
            'email': user.email,
            'username': user.username,
            'date_joined': user.date_joined
        } for user in users]
        return Response(response, status=status.HTTP_200_OK)

    # def post(self, request):
    #     serializer = serializers.CoreUserRegisterSerializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data)


class SignUpView(GenericAPIView):
    serializer_class = serializers.CoreUserRegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            send_otp_code_to_user(user['email'])
            return Response({
                'data': user,
                'message': f'Hi {user["email"]}, Thanks for signing up.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        otpcode = request.data.get('otp')
        try:
            cached_otp = cache.get(f'otp-{otpcode}')
            if not cached_otp:
                return Response({
                    'message': 'Your code expired please register again.'
                }, status=status.HTTP_204_NO_CONTENT)
            user_code_obj = OneTimePassword.objects.get(code=otpcode)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                cache.delete(f'otp-{otpcode}')
                return Response({
                    'message': 'Account email verified successfully.'
                }, status=status.HTTP_200_OK)
            return Response({
                'message': 'Invalid code, user is already verified.'
            }, status=status.HTTP_208_ALREADY_REPORTED)
        except OneTimePassword.DoesNotExist:
            return Response({
                'message': "There's No passcode."
            }, status=status.HTTP_404_NOT_FOUND)


class LoginUserView(GenericAPIView):
    serializer_class = serializers.CoreUserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PasswordResetRequestView(GenericAPIView):
    serializer_class = serializers.PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        return Response({
            'message': 'We have sent a link for you to reset your password.'
        }, status=status.HTTP_200_OK)


class PasswordResetConfirm(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = CoreUser.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({
                    'message': 'Invalid or expired token.'
                }, status=status.HTTP_401_UNAUTHORIZED)
            return Response({
                'succes': True,
                'message': 'Valid credentials',
                'uidb64': uidb64,
                'token': token
            }, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError:
            return Response({
                'message': 'Invalid link.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        except CoreUser.DoesNotExist:
            return Response({
                'message': 'Invalid link.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPassword(GenericAPIView):
    serializer_class = serializers.SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            'message': 'Your password has been successfully reset.'
        }, status=status.HTTP_200_OK)


class LogoutUserView(GenericAPIView):
    serializer_class = serializers.LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


def cache_test(request):
    template = "cache.html"
    start_time = time.time()
    data = None
    use_cache = None

    my_cache_data = cache.get('my_cache_data')

    if my_cache_data:
        use_cache = True
        data = my_cache_data
    else:
        data = "some example data"  # lookup from database or another source which is long running process
        time.sleep(5)  # long running process simulation
        cache.set('my_cache_data', data, timeout=5)  # 3600)  # Cache for 1 hour
        use_cache = False

    duration = time.time() - start_time

    extra_context = {
        "data": data,
        "duration": duration,
        "use_cache": use_cache,
    }
    return render(request, template, extra_context)


def clear_cache_data(request):
    cache.clear()  # clear session data
    return redirect("cache_test")  # after clear, will redirect to cache test without cache stored


# Session Store
def session_test(request):
    template = "session.html"
    my_session_data = request.session.get("my_session_data")
    extra_context = {
        "my_session_data": my_session_data,
    }
    return render(request, template, extra_context)


def add_session_data(request):
    request.session["my_session_data"] = "John Doe"
    return redirect("session_test")


def clear_session_data(request):
    request.session.flush()
    return redirect("session_test")
