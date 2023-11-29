import json
from rest_framework.test import APITestCase
from django.core import mail
from django.conf import settings
from contactform.api.serializers import ContactForm

class ContactFormTest(APITestCase):
    def setUp(self):
        self.url = '/api/contact'
        return super().setUp()
    
    def test_email_connection(self):
        """
        Test email configuration
        """
        # Ensure that email configuration is provided
        self.assertIsNotNone(settings.EMAIL_HOST, "EMAIL_HOST is not configured.")
        self.assertIsNotNone(settings.EMAIL_PORT, "EMAIL_PORT is not configured.")
        self.assertIsNotNone(settings.EMAIL_HOST_USER, "EMAIL_HOST_USER is not configured.")
        self.assertIsNotNone(settings.EMAIL_HOST_PASSWORD, "EMAIL_HOST_PASSWORD is not configured.")
        self.assertIsNotNone(settings.EMAIL_USE_TLS, "EMAIL_USE_TLS is not configured.")
        
        subject = 'Test Subject'
        message = 'Test message.'
        from_email = 'from@example.com'
        recipient_list = ['to@example.com']

        with mail.get_connection() as connection:
            response = mail.EmailMessage(
                subject,
                message,
                from_email,
                recipient_list,
                connection=connection,
            ).send()
        
        self.assertEqual(response, 1)
        
    def test_sent_success(self):
        """
        Verify success response with valid information
        """
        data = {
            'name': 'John Doe',
            'from_email': 'john@example.com',
            'phone': '12794992386',
            'company': 'ABC Corp',
            'message': 'This is a test message.',
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 200)
    
    def test_sent_invalid(self):
        """
        Verify error response with invalid information
        """
        response = self.client.post(self.url, ({}))
        self.assertEqual(response.status_code, 400)
        
        data = {
            'name': '',
            'from_email': 'invalid_email',
            'phone': '123',
            'company': 'A' * 201,
            'message': '',
        }

        response = self.client.post(self.url, data)
        errors = json.loads(response.content)['errors']
        self.assertEqual(response.status_code, 400)
        self.assertIn('name', errors)
        self.assertIn('from_email', errors)
        self.assertIn('phone', errors)
        self.assertIn('company', errors)
        self.assertIn('message', errors)

        
    def test_invalid_submission(self):
        """
        Check validation for fields: 
        Name - Must be string
        Email - Must be email, no header injections
        Phone - Must be valid phone number XXX-XXX-XXXX
        Company - Must be string
        Message - Must be long text
        """
        
        data = {
            'name': '',
            'from_email': '',
            'phone': '',
            'message': '',
        }
        form = ContactForm(data=data)
        print(form)
        self.assertFalse(form.is_valid())
        self.assertIn('name', form.errors)
        self.assertIn('from_email', form.errors)
        self.assertIn('phone', form.errors)
        self.assertNotIn('company', form.errors)
        self.assertIn('message', form.errors)
          
    def test_long_strings(self):
        """
        DOS attempt
        """
        data = {
            'name': 'A' * 10000,  # Submit a very long name
            'from_email': 'john@example.com' * 100,
            'phone': '12794992386' * 10,
            'company': 'Example Corp' * 20,
            'message': 'This is a test message.' * 100,
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)