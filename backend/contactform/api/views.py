from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from contactform.forms import ContactForm
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings

class ContactFormView(APIView):
    def post(self, request, *args, **kwargs):
        form = ContactForm(request.POST)
        if form.is_valid():
            from_email = form.cleaned_data['from_email']
            email_content = f"""
            Name: {form.cleaned_data['name']}
            Phone: {form.cleaned_data['phone']}
            Company: {form.cleaned_data['company']}
            
            {form.cleaned_data['message']}
            """
            
            try:
                send_mail(
                    "Peronsal Site Contact Submission",
                    email_content,
                    from_email,
                    [settings.EMAIL_HOST_USER],
                )
            except BadHeaderError:
                return Response({'errors': {'form': "Invalid headers found"}}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return Response({'message': 'Success'}, status=status.HTTP_200_OK)
        return Response({'errors': form.errors.as_json(escape_html=True)}, status=status.HTTP_400_BAD_REQUEST)