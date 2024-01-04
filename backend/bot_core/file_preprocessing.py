import os
from django.contrib import admin
from django.core.exceptions import ValidationError
from bot_core.file_upload_form import FileUploadForm
from langchain.text_splitter import RecursiveCharacterTextSplitter, Language
from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores.pgvector import PGVector
from django.conf import settings

CONNECTION_STRING = PGVector.connection_string_from_db_params(
    driver="psycopg2",
    host=settings.DATABASES["default"]["HOST"],
    port=settings.DATABASES["default"]["PORT"],
    database=settings.DATABASES["default"]["NAME"],
    user=settings.DATABASES["default"]["USER"],
    password=settings.DATABASES["default"]["PASSWORD"],
)

class FilePreprocessingAdmin(admin.ModelAdmin):
    form = FileUploadForm
    actions = ['process_file']
    
    def save_model(self, request, obj, form, change):
        if not form.is_valid():
            raise ValidationError("Invalid form data. Please check the form fields.")
        
        file = form.cleaned_data['file']
        file_name, _ = os.path.splitext(file.name)
        file_content = file.read().decode('utf-8')
        
        # Split and chunk
        # Considerations: 
        # Use basic django chunking. Convert file to html/markdown or load text to memory. Add fields for dynamic splitter variables.
        splitter = RecursiveCharacterTextSplitter.from_language(
            chunk_size=500,
            chunk_overlap=0,
            language=Language.MARKDOWN
            )
        documents = splitter.create_documents([file_content])   
              
        # Create embedding
        embedder = OllamaEmbeddings(base_url= settings.OLLAMA_BASE_URL, model='mistral')
        PGVector.from_documents(
            embedding=embedder,
            documents=documents,
            collection_name=file_name,
            connection_string=CONNECTION_STRING
        )
