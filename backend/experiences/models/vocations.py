from django.db import models
from django.utils.translation import gettext_lazy as _
from experiences.models.skills import Skill
from uuid import uuid4
import os

def rename_image(_, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid4().hex}.{ext}'
    return os.path.join('images/', filename)

class Vocation(models.Model):
    company = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    start_date = models.DateField(auto_now=False, auto_now_add=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    description = models.TextField()
    url = models.URLField(max_length=200)
    type = models.CharField(max_length=4, choices=[("WORK", _("work")), ("VOLU", _("volunteer")), ("NONP", _("non-profit")),], default="WORK")
    skills = models.ManyToManyField(Skill)
    logo = models.ImageField(upload_to=rename_image, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Vocation")
        verbose_name_plural = _("Vocations")

    def __str__(self):
        return f"{self.company} - {self.title}"
