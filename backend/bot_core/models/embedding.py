import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from pgvector.django import VectorField

class Embedding(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    embedding = VectorField(dimensions=1536)
    document = models.CharField(black=True, null=True)
    
    class Meta:
        verbose_name = _("Embedding")
        verbose_name_plural = _("Embeddings")