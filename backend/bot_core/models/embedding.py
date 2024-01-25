import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from pgvector.django import VectorField
from bot_core.models import LangchainPgCollection
    
class LangchainPgEmbedding(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    collection = models.ForeignKey(LangchainPgCollection, models.DO_NOTHING, blank=True, null=True)
    embedding = VectorField(dimensions=4096)
    document = models.CharField(blank=True, null=True)
    cmetadata = models.TextField(blank=True, null=True)
    custom_id = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'langchain_pg_embedding'
        verbose_name = _("Embedding")
        verbose_name_plural = _("Embeddings")