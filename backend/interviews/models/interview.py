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
    
    def get_message_tuples(self):
        messages = self.messages.all()
        formatted_messages = []

        # Should always start with human message
        for i in range(0, len(messages), 2):
            if i + 1 < len(messages):
                if messages[i].from_user:
                    human_message = messages[i].message
                    ai_message = messages[i + 1].message        
                else:
                    ai_message = messages[i].message
                    human_message = messages[i + 1].message
                    
                formatted_messages.append((human_message, ai_message))

        return formatted_messages