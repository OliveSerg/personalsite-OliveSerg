from rest_framework.routers import DefaultRouter
from experiences.api.urls import router as experience_router
from django.urls import path, include


router = DefaultRouter()
#experiences
router.registry.extend(experience_router.registry)

urlpatterns = [
    path('', include(router.urls))
]
