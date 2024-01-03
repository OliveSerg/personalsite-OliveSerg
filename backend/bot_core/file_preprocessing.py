import os
from django.contrib import admin
from django.core.exceptions import ValidationError
from bot_core.models import Embedding, Collection
from bot_core.file_upload_form import FileUploadForm
from langchain.text_splitter import RecursiveCharacterTextSplitter, Language
from langchain.embeddings import OllamaEmbeddings
from django.conf import settings

class FilePreprocessingAdmin(admin.ModelAdmin):
    form = FileUploadForm
    actions = ['process_file']
    
    def save_model(self, request, obj, form, change):
        if not form.is_valid():
            raise ValidationError("Invalid form data. Please check the form fields.")
        
        file = form.cleaned_data['file']
        file_name, file_extension = os.path.splitext(file.name)
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
        embedding_vectors = embedder.embed_documents(documents)
        print(len(embedding_vectors[0]))
        print(len(embedding_vectors[1]))
        collection = Collection(name = file_name, file_type = file_extension) # Use library to get mime type instead
        for index, embedding_vector in enumerate(embedding_vectors):
            collection.embedding_set.create(embedding = embedding_vector, document = documents[index].page_content)
        
        collection.save()