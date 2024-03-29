from django.db import models
from django.utils.translation import gettext_lazy as _
from interviews.models import Interview

class Message(models.Model):
    interview = models.ForeignKey(Interview, default=None, related_name='messages', on_delete=models.CASCADE)
    message = models.TextField()
    from_user = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _("Chat Message")
        verbose_name_plural = _("Chat Messages")
        
    def __str__(self):
        return f"{self.interview}: {self.id}"