from interviews.models import Interview, Message
from interviews.api.serializers import InterviewSerializer, MessageSerializer 
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from langchain.memory.chat_message_histories.in_memory import ChatMessageHistory
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.embeddings import OllamaEmbeddings
from rest_framework import status

class InterviewChat(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    # Get User interview and messages
    def get(self, request):
        try:
            interview = Interview.objects.get(pk=request.user)
            serializer = InterviewSerializer(data=interview)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Interview.DoesNotExist:
            # Create interview
            serializer = InterviewSerializer(data={"user": request.user, "company": request.data["company"]})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # Create message and send back AI generated response
    def post(self, request, interview_id):
        pass
    
    def __store_message(self, response, interview_id, from_user = True):
        MessageSerializer(
            interview_id=interview_id,
            response=response,
            from_user=from_user,
        )