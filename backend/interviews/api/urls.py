from django.urls import path
from rest_framework.authtoken import views
from interviews.api.views import InterviewChat

urlpatterns = [
    path('interviews/', InterviewChat.as_view())
]