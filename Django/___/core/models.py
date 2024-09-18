from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


# # Custom user Definition and configuration.
# class React(models.Model):
#     pass


class CoreUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        user = self.process_user(email, password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        user = self.process_user(email, password)
        user.is_superuser
        user.save()
        return user

    @classmethod
    def process_user(cls, email, password):
        if not email:
            raise ValueError("User's email is a required field.")
        if not password:
            raise ValueError("User's password is a required field.")
        email = cls.normalize_email(email)
        user = cls.model(email=email)
        user.set_password(password)
        return user


class CoreUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    date_joined = models.DateField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = CoreUserManager()

    def __str__(self):
        return self.username
