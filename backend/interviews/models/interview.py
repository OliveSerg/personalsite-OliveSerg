from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Interview(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    
    
    class Meta:
        verbose_name = _("Interview")
        verbose_name_plural = _("Interviews")
    
    def __str__(self) -> str:
        return f"{self.user}:{self.created_at}"