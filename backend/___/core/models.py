from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken

from .manager import CoreUserManager

AUTH_PROVIDERS = {
    'email': 'email',
    'google': 'google',
    'github': 'github',
    'facebook': 'facebook'
}


class CoreUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True, verbose_name=_('Email'))
    username = models.CharField(max_length=50, verbose_name=_('User Name'))

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    auth_provider = models.CharField(max_length=50, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CoreUserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


class OneTimePassword(models.Model):
    user = models.OneToOneField(CoreUser, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.user.username}-passcode"
