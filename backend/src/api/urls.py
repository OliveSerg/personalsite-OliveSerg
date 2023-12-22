from rest_framework.routers import DefaultRouter
from experiences.api.urls import router as experience_router
from contactform.api.urls import urlpatterns as contact_urls
from authentication.api.urls import urlpatterns as auth_urls
from django.urls import path, include

router = DefaultRouter()
view_urlpatterns = contact_urls + auth_urls
router.registry.extend(experience_router.registry)

urlpatterns = [
    path('', include(router.urls + view_urlpatterns))
]
