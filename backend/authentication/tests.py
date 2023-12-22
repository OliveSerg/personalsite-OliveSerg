from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

USER = get_user_model()

class AuthenticationTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('api/register')
        self.login_url = reverse('api/get-auth')
        self.user_data = {
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
        login_data = {
            'email': 'test@example.com',
            'password': 'password',
        }
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        access_token = response.data['access']

        authenticated_response = self.client.get(reverse('protected-endpoint'), HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(authenticated_response.status_code, status.HTTP_200_OK)
        self.assertIn('example_data', authenticated_response.data)

    def test_invalid_token_authentication(self):
        invalid_token = 'invalid_token'
        invalid_authenticated_response = self.client.get(reverse('protected-endpoint'), HTTP_AUTHORIZATION=f'Bearer {invalid_token}')
        self.assertEqual(invalid_authenticated_response.status_code, status.HTTP_401_UNAUTHORIZED)