from rest_framework.viewsets import ReadOnlyModelViewSet
from experiences.models import Vocation, Skill
from experiences.api.serializers import VocationSerializer, SkillSerializer

class VocationViewSet(ReadOnlyModelViewSet):
    queryset = Vocation.objects.all().order_by('start_date')
    serializer_class = VocationSerializer
    
class SkillViewSet(ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
