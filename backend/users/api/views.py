from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer, VerifyEmailSerializer
from rest_framework import status
from users.emails import send_otp_via_email
from users.models import User
from rest_framework.exceptions import AuthenticationFailed,ParseError
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken 

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)


# ------------------ user registration ---------------------
class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = UserRegisterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                send_otp_via_email(serializer.data['email'])
            else:
                error_messages = []
                for field, errors in serializer.errors.items():
                    for error in errors:
                        if field == 'email' and 'unique' in error:
                            error_messages.append("Email already exists")
                        elif field == 'password' and 'min_length' in error:
                            error_messages.append("Password must be at least 8 characters long")
                        # Add more conditions for other fields and error types as needed
                        else:
                            error_messages.append(f"{field.capitalize()}: {error}")
                
                content = {"message": error_messages}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
            
            content = {"Message":"User Registration Succssful , Check Email for OTP "}
            print(serializer)
            return Response(content, status=status.HTTP_201_CREATED,)
        
        except Exception as e:
            print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# ------------------- otp -------------------
class VerifyOTP(APIView):
    def post(self, request):
        try:
            serializer = VerifyEmailSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data.get('email')
                otp = serializer.validated_data.get('otp')
                
                user = User.objects.filter(email=email).first()
                if not user:
                    content = {'message': "Something went wrong please Register again"}
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


# ---------------- user Login ------------------

class LoginView(APIView):
    def post(self,request):
        try:
            email = request.data['email']
            password = request.data['password']
        except:
            raise ParseError('All Fields Are Required')
        
        if not User.objects.filter(email=email).exists() :
            raise AuthenticationFailed('Invalid Email Address')
        
        if not User.objects.filter(email=email, is_active=True).exists() :
            raise AuthenticationFailed("Your are blocked by the Admin ! ")
        
        user = authenticate(email=email, password=password)

        if user is None :
            raise AuthenticationFailed("Invalid Password")
        else:
            user_obj = User.objects.get(email=email)
            if not user_obj.is_varified:
                raise AuthenticationFailed("Email is not varified")
        
        
        refresh = RefreshToken.for_user(user) # generating new refresh token for the user
        refresh["username"] = str(user.username) # custom cliam in the acess token

        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'is_admin': user.is_superuser,
        }

        return Response(content,status=status.HTTP_200_OK)
    




