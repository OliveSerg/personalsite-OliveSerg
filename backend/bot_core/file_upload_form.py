from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from bot_core.models import Collection

class FileUploadForm(forms.ModelForm):
    ALLOWED_EXTENSIONS = ['txt'] # Handle other types at a later date
    file = forms.FileField(label='Upload and Process File', validators=[
        lambda file: _validate_file_type(file, FileUploadForm.ALLOWED_EXTENSIONS)
    ])
    
    class Meta:
        model = Collection
        fields = ['file']

def _validate_file_type(file, allowed_extensions):
    if not file.name.lower().endswith(tuple(allowed_extensions)):
        raise ValidationError(_(f"Only specific file types are allowed. Allowed: {', '.join(allowed_extensions)}"))