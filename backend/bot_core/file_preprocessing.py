import os
from django.contrib import admin
from django.core.exceptions import ValidationError
from bot_core.file_upload_form import FileUploadForm
from langchain.text_splitter import Language, MarkdownTextSplitter
from langchain.embeddings import OllamaEmbeddings
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
        splitter = MarkdownTextSplitter(
            chunk_size=500,
            chunk_overlap=10
        )
        documents = splitter.create_documents([file_content])   
              
        # Create embedding
        embedder = OllamaEmbeddings(base_url= settings.OLLAMA_BASE_URL, model=settings.OLLAMA_MODEL)
        PGVector.from_documents(
            embedding=embedder,
            documents=documents,
            connection_string=CONNECTION_STRING
        )
