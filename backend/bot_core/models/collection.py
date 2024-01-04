import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _

class LangchainPgCollection(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(blank=True, null=True)
    cmetadata = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = 'langchain_pg_collection'
        verbose_name = _("Collection")
        verbose_name_plural = _("Collections")