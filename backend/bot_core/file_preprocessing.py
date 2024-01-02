from django.contrib import admin
from django.core.files.storage import default_storage
from bot_core.models.embedding import Embedding
from bot_core.file_upload_form import FileUploadForm
from langchain.text_splitter import RecursiveCharacterTextSplitter

class FilePreprocessingAdmin(admin.ModelAdmin):
    form = FileUploadForm
    actions = ['process_file']
    
    def save_model(self, request, obj, form, change):
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['file']
            
            # Split and chunk
            
            # Create embedding
        pass