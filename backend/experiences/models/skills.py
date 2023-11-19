from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.translation import gettext_lazy as _
 
class Skill(models.Model):
    name = models.CharField(max_length=50)
    subskills = ArrayField(models.CharField(max_length=50), blank=True) #may need to change self-relational
    level = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    

    class Meta:
        verbose_name = _("Skill")
        verbose_name_plural = _("Skills")

    def __str__(self):
        return self.name

