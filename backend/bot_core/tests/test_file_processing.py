import os
from django.test import TestCase
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.storage import default_storage
from django.urls import reverse
from bot_core.models.embedding import Embedding

class FileProcessingTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='admin', is_staff=True, is_superuser=True)
        self.client.force_login(self.user)

    def test_create_embedding_from_file(self):
        file_content = b"Sample file content."
        uploaded_file = SimpleUploadedFile("test_file.txt", file_content, content_type="text/plain")
                
        response = self.client.post(reverse('admin:create_embedding_from_file'), {
            'document_name': 'Test Document',
            'embedding_data': uploaded_file,
        })
        
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Embedding.objects.count(), 1)
        
        embedding = Embedding.objects.first()
        self.assertEqual(embedding.document, "Test Document")
        self.assertIsInstance(embedding.embedding, )
        
    def test_invalid_file_format(self):
        file_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00'
        uploaded_file = SimpleUploadedFile("invalid_file.png", file_content, content_type="image/png")

        response = self.client.post(reverse('admin:create_embedding_from_file'), {
            'document_name': 'Invalid Document',
            'embedding_data': uploaded_file,
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Embedding.objects.count(), 0)

    def test_missing_file_upload(self):
        response = self.client.post(reverse('admin:create_embedding_from_file'), {
            'document_name': 'Missing File Document',
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Embedding.objects.count(), 0)