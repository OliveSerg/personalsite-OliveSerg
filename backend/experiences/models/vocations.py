from django.db import models
from django.utils.translation import gettext_lazy as _
from experiences.models.skills import Skill

class Vocation(models.Model):
    company = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    start_date = models.DateField(auto_now=False, auto_now_add=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False, blank=True)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    description = models.TextField()
    url = models.URLField(max_length=200)
    type = models.CharField(max_length=4, choices=[("WORK", _("work")), ("VOLU", _("volunteer")), ("NONP", _("non-profit")),], default="WORK")
    skills = models.ManyToManyField(Skill)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Vocation")
        verbose_name_plural = _("Vocations")

    def __str__(self):
        return self.name
