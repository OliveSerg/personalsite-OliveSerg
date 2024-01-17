from interviews.models import Interview, Message
from interviews.api.serializers import InterviewSerializer, MessageSerializer 
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from bot_core.text_generation import TextGeneration

class InterviewChat(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            interview = Interview.objects.get(user=request.user)
            serializer = InterviewSerializer(interview)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Interview.DoesNotExist:
            serializer = InterviewSerializer(data={"user": request.user.pk, "company": request.query_params["company"]})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        # Create message and send back AI generated response
        if not ('message' in request.data and request.data['message']):
            return Response({'errors': {'message': "Message can not be null"}}, status=status.HTTP_400_BAD_REQUEST)

        try:
            interview = Interview.objects.get(user=request.user)
        except Interview.DoesNotExist:
            return Response({'errors': {'message': "Entry does not exist"}}, status=status.HTTP_400_BAD_REQUEST)
        
        message = {"interview": interview.pk,
                   "message": request.data['message'],
                   "from_user": True}
        message_serialized = MessageSerializer(data=message)
        if not message_serialized.is_valid():
            return Response({'errors': message_serialized.errors}, status=status.HTTP_400_BAD_REQUEST)
        message_serialized.save()
        
        chat_history = interview.get_message_tuples()
        response = TextGeneration().generate_response(question=message_serialized.data['message'], chat_history=chat_history)
        message = {"interview": interview.pk,
                   "message": response.content,
                   "from_user": False}
        
        ai_message_serialized = MessageSerializer(data=message)
        if not ai_message_serialized.is_valid():
            return Response({'errors': ai_message_serialized.errors}, status=status.HTTP_400_BAD_REQUEST)
        ai_message_serialized.save()
        return Response(ai_message_serialized.data, status=status.HTTP_200_OK) 
