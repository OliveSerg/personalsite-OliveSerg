from rest_framework import serializers
from interviews.models import Interview, Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model= Interview
        fields= '__all__'
