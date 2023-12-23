from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from interviews.models import Interview, Message

class InterviewModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.interview = Interview.objects.create(user=self.user, company='Test Company')
        self.client = APIClient()

    def test_interview_model(self):
        self.assertEqual(str(self.interview), f"{self.user}:{self.interview.created_at}")

    def test_message_model(self):
        message = Message.objects.create(interview=self.interview, message='Test Message', from_user=True)
        self.assertEqual(str(message), f"{self.interview}: {message.id}")
        
    def test_get_user_interview(self):
        response = self.client.get(f'/api/users/{self.user.id}/interview/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['company'], 'Test Company')


class MessageTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.interview = Interview.objects.create(user=self.user, company='Test Company')

    def test_get_messages_for_interview(self):
        Message.objects.create(interview=self.interview, message='Test Message 1', from_user=True)
        Message.objects.create(interview=self.interview, message='Test Message 2', from_user=False)

        response = self.client.get(f'/api/users/{self.user.id}/conversation/messages/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
