from django.contrib import admin
from bot_core.models import LangchainPgCollection, LangchainPgEmbedding
from bot_core.file_preprocessing import FilePreprocessingAdmin

admin.site.register(LangchainPgCollection, FilePreprocessingAdmin)
admin.site.register(LangchainPgEmbedding)
