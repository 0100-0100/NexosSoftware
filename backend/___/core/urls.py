from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # JWT Register - Login - Logout - Reset Password Flow.
    path('register', views.RegisterUserView.as_view(), name='register'),
    path('verify', views.VerifyUserEmail.as_view(), name='verify'),
    path('login', views.LoginUserView.as_view(), name='login'),

    path('refresh', TokenRefreshView.as_view(), name='refresh'),

    path('password-reset', views.PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>', views.PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password', views.SetNewPassword.as_view(), name='set-new-password'),

    # Test Path for validating correrct access to resources once authenticated.
    path('test', views.TestGetUsersEndpoint.as_view(), name='test'),

    path('logout', views.LogoutUserView.as_view(), name='logout'),

    # Redis Testing endpoints.
    path("cache_test", views.cache_test, name="cache_test"),
    path("clear_cache_data", views.clear_cache_data, name="clear_cache_data"),
    path("session_test", views.session_test, name="session_test"),
    path("add_session_data", views.add_session_data, name="add_session_data"),
    path("clear_session_data", views.clear_session_data, name="clear_session_data"),
]
