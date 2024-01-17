from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.authtoken.models import Token
from interviews.models import Interview, Message
from authentication.api.serializers import UserSerializer

class InterviewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserSerializer(data={
            'username': 'test@example.com',
            'email': 'test@example.com',
            'password': 'password',
        })
        self.user.is_valid()
        self.user = self.user.save()
        token = Token.objects.get(user__username='test@example.com')
        self.client.force_authenticate(user=self.user, token=token)
        
    def test_initial_user_interview(self):
        response = self.client.get('/api/interviews/', {'company': 'Test Company'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['company'], 'Test Company')
        
    def test_get_user_interview(self):
        Interview.objects.create(user=self.user, company='Test Company')
        response = self.client.get('/api/interviews/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['company'], 'Test Company')
        
    def test_interview_validation_error(self):
        response = self.client.post('/api/interviews/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

class MessageTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserSerializer(data={
            'username': 'test@example.com',
            'email': 'test@example.com',
            'password': 'password',
        })
        self.user.is_valid()
        self.user = self.user.save()
        self.interview = Interview.objects.create(user=self.user, company='Test Company')
        token = Token.objects.get(user__username='test@example.com')
        self.client.force_authenticate(user=self.user, token=token)

    def test_get_messages_for_interview(self):
        Message.objects.create(interview=self.interview, message='Test Message 1', from_user=True)
        Message.objects.create(interview=self.interview, message='Test Message 2', from_user=False)

        response = self.client.get(f'/api/interviews/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['messages']), 2)
    
    def test_post_user_message(self):
        data = {'message': 'This is just a user message'}
        response = self.client.post(f'/api/interviews/', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Message.objects.count(), 2)
        self.assertEqual(Message.objects.first().message, 'This is just a user message')
        
        ai_response = response.data
        self.assertIsInstance(ai_response['message'], str)
        self.assertEqual(ai_response['from_user'], False)
        self.assertNotEqual(ai_response['message'], '')
    
    def test_message_validation_error(self):
        response = self.client.post('/api/interviews/', {'message': ''}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

