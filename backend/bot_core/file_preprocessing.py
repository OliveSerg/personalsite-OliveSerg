from django.contrib import admin
from django.core.exceptions import ValidationError
from bot_core.file_upload_form import FileUploadForm
from langchain.text_splitter import MarkdownHeaderTextSplitter
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_community.embeddings import HuggingFaceHubEmbeddings
from langchain_community.vectorstores.pgvector import PGVector
from django.conf import settings
from bot_core.pgvector_settings import CONNECTION_STRING

class FilePreprocessingAdmin(admin.ModelAdmin):
    form = FileUploadForm
    actions = ['process_file']
    
    def save_model(self, request, obj, form, change):
        if not form.is_valid():
            raise ValidationError("Invalid form data. Please check the form fields.")
        
        file = form.cleaned_data['file']
        file_content = file.read().decode('utf-8')
        
        # Split and chunk
        # Considerations: 
        # Use basic django chunking. Convert file to html/markdown or load text to memory. Add fields for dynamic splitter variables.
        splitter = MarkdownHeaderTextSplitter(
            [
                ("#", "Header 1"),
                ("##", "Header 2"),
                ("###", "Header 3"),
            ]
        )
        documents = splitter.split_text(file_content)
              
        # Create embedding
        embedder = HuggingFaceHubEmbeddings()
        PGVector.from_documents(
            embedding=embedder,
            documents=documents,
            connection_string=CONNECTION_STRING
        )
