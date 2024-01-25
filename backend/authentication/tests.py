from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

USER = get_user_model()

class AuthenticationTests(APITestCase):
    def setUp(self):
        self.register_url = '/api/register'
        self.login_url = '/api/get-auth'
        self.user_data = {
            'username': 'test@example.com',
            'email': 'test@example.com',
            'password': 'password',
        }
    
    def test_create_user(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(USER.objects.count(), 1)
        self.assertEqual(USER.objects.get().email, 'test@example.com')

    def test_token_authentication(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        
    def test_invalid_token_authentication(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
      