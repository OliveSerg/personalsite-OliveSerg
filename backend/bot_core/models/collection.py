import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _

class Collection(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField()
    file_type = models.CharField()
    
    class Meta:
        verbose_name = _("Collection")
        verbose_name_plural = _("Collections")