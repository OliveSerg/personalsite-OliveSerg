from rest_framework.test import APITestCase
from django.core.mail import send_mail, outbox
from django.conf import settings
from contactform.forms import ContactForm

class ContactFormTest(APITestCase):
    def setUp(self):
        self.url = '/contact/'
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

        with self.assertLogs('django', level='INFO') as mail_logs:
            send_mail(subject, message, from_email, recipient_list)

        # Check if the logs indicate that the email was sent successfully
        self.assertIn('INFO:django.mail.backends.smtp:send_messages', mail_logs.output)
        self.assertIn('1 message(s) sent', mail_logs.output)

        # Check the contents of the sent email
        sent_email = outbox[0]
        self.assertEqual(sent_email.subject, subject)
        self.assertEqual(sent_email.body, message)
        self.assertEqual(sent_email.from_email, from_email)
        self.assertEqual(sent_email.to, recipient_list)
        
    def test_sent_success(self):
        """
        Verify success response with valid information
        """
        data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '1234567890',
            'company': 'ABC Corp',
            'message': 'This is a test message.',
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 200)
    
    def test_sent_invalid(self):
        """
        Verify error response with invalid information
        """
        response = self.client.post(self.contact, data={})
        self.assertEqual(response.status_code, 400)
        
        data = {
            'name': '',
            'email': 'invalid_email',
            'phone': '123',
            'company': 'A' * 201,
            'message': '',
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)
        self.assertFormError(response, 'form', 'name', 'Name is required')
        self.assertFormError(response, 'form', 'email', 'Email must be a valid email format e.g. you@example.com')
        self.assertFormError(response, 'form', 'phone', 'Phone must be of the format XXX-XXX-XXXX')
        self.assertFormError(response, 'form', 'company', 'Max length is 100 characters. Or consider changing your company name')
        self.assertFormError(response, 'form', 'message', 'Message is required')
        
    def test_invalid_submission(self):
        """
        Check validation for fields: 
        Name - Must be string
        Email - Must be email, no header injections
        Phone - Must be valid phone number XXX-XXX-XXXX
        Company - Must be string
        Message - Must be long text
        """
        
        data = {}
        form = ContactForm(data)
        self.assertFalse(form.is_valid())
        self.assertIn('name', form.errors)
        self.assertIn('email', form.errors)
        self.assertIn('phone', form.errors)
        self.assertNotIn('company', form.errors)
        self.assertIn('message', form.errors)

    def test_sql_injection_attempt(self):
        """
        SQL inject attack
        """
        form_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '123-456-7890',
            'company': 'Example Corp',
            'message': "'; DROP TABLE some_table; --",
        }

        response = self.client.post(self.url, data=form_data)
        self.assertEqual(response.status_code, 400)

    def test_xss_attempt(self):
        """
        Cross-site-scripting attempt
        """
        form_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '123-456-7890',
            'company': 'Example Corp',
            'message': '<script>alert("XSS attack");</script>',
        }

        response = self.client.post(self.url, data=form_data)
        self.assertEqual(response.status_code, 400)
          
    def test_long_strings(self):
        """
        DOS attempt
        """
        form_data = {
            'name': 'A' * 10000,  # Submit a very long name
            'email': 'john@example.com' * 100,
            'phone': '123-456-7890' * 10,
            'company': 'Example Corp' * 20,
            'message': 'This is a test message.' * 100,
        }

        response = self.client.post(self.url, data=form_data)
        self.assertEqual(response.status_code, 400)