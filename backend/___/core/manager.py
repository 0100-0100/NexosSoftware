from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class CoreUserManager(BaseUserManager):
    def create_user(self, email, username, password, **kw):
        user = self.process_user(email, username, password, **kw)
        return user

    def create_superuser(self, email, username, password, **kw):
        kw.setdefault('is_staff', True)
        kw.setdefault('is_superuser', True)
        kw.setdefault('is_verified', True)
        user = self.process_user(email, username, password, **kw)
        return user

    def process_user(self, email, username, password, **kw):

        if not email:
            raise ValueError(_('An email is required.'))
        if not username:
            raise ValueError(_('A username is required.'))

        email = self.normalize_email(email)
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_('Invalid email.'))

        user = self.model(email=email, username=username, **kw)
        user.set_password(password)
        user.save(using=self._db)
        return user
