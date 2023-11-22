from django.urls import path
from contactform.api.views import ContactFormView

urlpatterns = [
    path("contact/", ContactFormView.as_view(), name="contact"),
]