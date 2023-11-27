from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField

class ContactForm(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=40)
    from_email = serializers.EmailField(required=True)
    phone = PhoneNumberField(region='CA')
    company = serializers.CharField(max_length=100, required=False, allow_blank=True)
    message = serializers.CharField(required=True)
