from django.conf import settings
from django.core.cache import cache
from django.core.mail import EmailMessage

from .models import CoreUser, OneTimePassword

import random


# TODO Use pyOTP
# Note to future, implement pyOTP for appropriate OTP generation.
def generateOtp():
    otp = ''
    for i in range(6):
        otp += str(random.randint(1, 9))

    if cache.get(f'otp-{otp}'):
        return generateOtp()

    return otp


def send_otp_code_to_user(email):
    otp_code = generateOtp()
    user = CoreUser.objects.get(email=email)

    OneTimePassword.objects.create(user=user, code=otp_code)
    cache.set(f'otp-{otp_code}', otp_code, timeout=60*5)

    from_email = settings.DEFAULT_FROM_EMAIL
    subject = 'Your one time password for email verification.'
    email_body = f"""
    Hi {user.username}, Thanks for signing up
    Please verify your account with the following code.
    {otp_code}
    """
    outbox = EmailMessage(
        subject=subject, body=email_body, from_email=from_email, to=[email]
    )
    outbox.send(fail_silently=True)


def send_normal_email(data):
    EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    ).send()
