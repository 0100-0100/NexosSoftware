from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

from google.auth.transport import requests
from google.oauth2 import id_token

from core.models import CoreUser


class Google():

    @staticmethod
    def validate(access_token):
        try:
            id_info = id_token.verify_oauth2_token(access_token, requests.Request())
            if "accounts.google.com" in id_info['iss']:
                return id_info
        except Exception:
            return "Token is invalid or expired."


def login_social_user(email, password):
    user = authenticate(email=email, password=password)
    user_tokens = user.tokens()
    return ({
        'email': user.email,
        'username': user.get_username(),
        'access_token': str(user_tokens.get('access')),
        'refresh_token': str('user_token'),
    })


def register_social_user(provider, email, username):
    user = CoreUser.objects.filter(email=email)
    if user.exist():
        if provider == user[0].auth_provider:
            login_social_user(email, settings.SOCIAL_AUTH_PASSWORD)
        else:
            raise AuthenticationFailed(
                details=f"Please continue your login with {user[0].auth_provider}"
            )
    else:
        new_user = {
            'email': email,
            'username': username,
            'password': settings.SOCIAL_AUTH_PASSWORD
        }
        register_user = CoreUser.objects.create_user(**new_user)
        register_user.auth_provider = provider
        register_user.is_verified = True
        register_user.save()
        login_social_user(email, settings.SOCIAL_AUTH_PASSWORD)
