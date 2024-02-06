from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer, VerifyEmailSerializer
from rest_framework import status
from users.emails import send_otp_via_email
from users.models import User

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)

class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = UserRegisterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                send_otp_via_email(serializer.data['email'])
            else:
                return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
            
            content = {'Message':"User Registration Succssful , Check Email for OTP "}
            return Response(content, status=status.HTTP_201_CREATED,)
        
        except Exception as e:
            print(e)

class VerifyOTP(APIView):
    def post(self, request):
        try:
            serializer = VerifyEmailSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data.get('email')
                otp = serializer.validated_data.get('otp')
                
                user = User.objects.filter(email=email).first()
                if not user:
                    content = {'message': "Invalid Email"}
                    return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
                
                if user.otp != otp :
                    content = {"message":"Invalid OTP"}
                    return Response(content, status=status.HTTP_400_BAD_REQUEST )
                
                user.is_varified = True
                user.save()

                content = {"message":"Verified"}
                return Response(content, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)