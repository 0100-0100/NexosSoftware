from django.urls import path
from . import views

urlpatterns = [
    # JWT Register - Login - Logout - Reset Password Flow.
    path('register', views.RegisterUserView.as_view(), name='register'),
    path('verify', views.VerifyUserEmail.as_view(), name='verify'),
    path('login', views.LoginUserView.as_view(), name='login'),

    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password-rest'),
    path('password-reset-confirm/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', views.SetNewPassword.as_view(), name='set-new-password'),

    path('logout/', views.LogoutUserView.as_view(), name='logout'),

    # Test Path for validating correrct access to resources once authenticated.
    path('test-auth/get-users', views.TestGetUsersEndpoint.as_view(), name='test-auth/get-users'),

    # Redis Testing endpoints.
    path("cache_test", views.cache_test, name="cache_test"),
    path("clear_cache_data", views.clear_cache_data, name="clear_cache_data"),
    path("session_test", views.session_test, name="session_test"),
    path("add_session_data", views.add_session_data, name="add_session_data"),
    path("clear_session_data", views.clear_session_data, name="clear_session_data"),
]
