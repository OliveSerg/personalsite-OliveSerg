from rest_framework import serializers
from experiences.models import Vocation, Skill

class VocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vocation
        fields = ['id', 'company', 'title', 'start_date', 'end_date', 'city', 'country', 'description', 'url', 'type', 'skills', 'logo']
        
        
class SkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'subskills', 'level',]