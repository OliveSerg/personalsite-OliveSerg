from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from interviews.models import Interview, Message

class InterviewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.interview = Interview.objects.create(user=self.user, company='Test Company')
        self.client = APIClient()

    def test_interview_model(self):
        self.assertEqual(str(self.interview), f"{self.user}:{self.interview.created_at}")
        
    def test_get_user_interview(self):
        response = self.client.get(f'/api/users/{self.user.id}/interview/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['company'], 'Test Company')
        
    def test_interview_validation_error(self):
        response = self.client.post('/api/interviews/', {'user': self.user.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('company', response.data)


class MessageTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.interview = Interview.objects.create(user=self.user, company='Test Company')

    def test_get_messages_for_interview(self):
        Message.objects.create(interview=self.interview, message='Test Message 1', from_user=True)
        Message.objects.create(interview=self.interview, message='Test Message 2', from_user=False)

        response = self.client.get(f'/api/users/{self.user.id}/interview/messages/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    
    def test_post_user_message(self):
        data = {'interview': self.interview.id, 'message': 'User Message', 'from_user': True}
        response = self.client.post(f'/api/users/{self.user.id}/interview/messages/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Message.objects.count(), 1)
        self.assertEqual(Message.objects.first().message, 'User Message')
        self.assertIn('response', response.data)
        ai_response = response.data['response']
        self.assertIsInstance(ai_response.message, str)
        self.assertEqual(ai_response.from_user, False)
        self.assertNotEqual(ai_response.message, '')
    
    def test_message_validation_error(self):
        response = self.client.post('/api/messages/', {'interview': self.interview.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)

