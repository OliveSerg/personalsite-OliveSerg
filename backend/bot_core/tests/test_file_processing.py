from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from django.contrib.admin.sites import AdminSite
from django.db import connection
from bot_core.models import LangchainPgEmbedding, LangchainPgCollection
from bot_core.file_preprocessing import FilePreprocessingAdmin
from bot_core.file_upload_form import FileUploadForm
     
class FileProcessingTestCase(TestCase):
    def setUp(self):
        super().setUp()
        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(LangchainPgCollection)
            schema_editor.create_model(LangchainPgEmbedding)

        self.site = AdminSite()
        file_content = b"Sample file content."
        self.uploaded_file = SimpleUploadedFile("test_file.txt", file_content, content_type="text/plain")
    
    def tearDown(self):
        super().tearDown()

        with connection.schema_editor() as schema_editor:
            schema_editor.delete_model(LangchainPgCollection)
            schema_editor.delete_model(LangchainPgEmbedding)
        
    def test_file_upload(self):
        file_upload_form = FileUploadForm(files={'file':self.uploaded_file})
        self.assertTrue(file_upload_form.is_valid())
        
    def test_invalid_file_format(self):
        file_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00'
        uploaded_file = SimpleUploadedFile("invalid_file.png", file_content, content_type="image/png")
        
        file_upload_form = FileUploadForm(files={'file':uploaded_file})
        self.assertFalse(file_upload_form.is_valid())

    def test_invalid_file_extension(self):
        # Test if uploading a file with an invalid extension raises a validation error
        invalid_extension_file = SimpleUploadedFile("invalid_file.invalid", b"Invalid content", content_type="text/plain")
        file_upload_form = FileUploadForm(files={'file':invalid_extension_file})
        self.assertFalse(file_upload_form.is_valid())
        
    def test_empty_file_upload(self):
        # Upload an empty file and check if it's considered invalid
        empty_file = SimpleUploadedFile("empty_file.txt", b"", content_type="text/plain")

        file_upload_form = FileUploadForm(files=empty_file)
        self.assertFalse(file_upload_form.is_valid())
        
    def test_create_embedding_from_file(self):        
        file_upload_form = FileUploadForm(files={'file':self.uploaded_file}) 
        file_processor_admin = FilePreprocessingAdmin(model=LangchainPgCollection, admin_site=AdminSite)
        file_processor_admin.save_model(request=None, obj=None, form=file_upload_form, change=None)
        
        self.assertEqual(LangchainPgCollection.objects.count(), 1)
        self.assertEqual(LangchainPgEmbedding.objects.count(), 1)
        embedding = LangchainPgEmbedding.objects.first()
        self.assertEqual(embedding.document, "Sample file content.")
        
    def test_missing_file_upload(self):
        file_upload_form = FileUploadForm(files={}) 
        file_processor_admin = FilePreprocessingAdmin(model=LangchainPgCollection, admin_site=AdminSite)
        file_processor_admin.save_model(request=None, obj=None, form=file_upload_form, change=None)

        self.assertEqual(LangchainPgCollection.objects.count(), 0)
        self.assertEqual(LangchainPgEmbedding.objects.count(), 0)