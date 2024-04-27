from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from ..gemini import generate_response
import markdown

class ChatbotView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request):
        prompt = request.query_params.get('message')
        
        response = generate_response(prompt)
        return Response({'message':response, 'isSender':False}, status=status.HTTP_200_OK)