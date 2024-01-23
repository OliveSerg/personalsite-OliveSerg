from rest_framework import serializers
from interviews.models import Interview, Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class InterviewSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model= Interview
        fields= ['updated_at','created_at','messages']