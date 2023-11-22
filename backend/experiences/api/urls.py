from rest_framework.routers import DefaultRouter
from experiences.api.views import VocationViewSet, SkillViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'vocations', VocationViewSet)
router.register(r'skills', SkillViewSet)
