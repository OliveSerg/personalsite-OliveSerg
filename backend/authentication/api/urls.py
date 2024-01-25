from django.urls import path
from rest_framework.authtoken import views
from authentication.api.views import AuthView

urlpatterns = [
    path('get-auth', views.obtain_auth_token),
    path('register', AuthView.as_view(), name='register')
]