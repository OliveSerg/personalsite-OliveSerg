from django import forms
from phonenumber_field.formfields import PhoneNumberField

class ContactForm(forms.Form):
    name = forms.CharField(required=True, max_length=40)
    from_email = forms.EmailField(required=True, label="Email")
    phone = PhoneNumberField(region='CA')
    company = forms.CharField(max_length=100, required=False)
    message = forms.CharField(widget=forms.Textarea, required=True)
