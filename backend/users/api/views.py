#  --------------------- Django imports --------------------
from django.http import JsonResponse

# ---------------------------- REST framework imports ------------------
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, ParseError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# google login
from google.oauth2 import id_token
from google.auth.transport import requests
# --------------------- --- Custom imports ---------------------------
from .serializers import (
    UserRegisterSerializer,
    VerifyEmailSerializer,
    UserSerializer
)
from users.emails import send_otp_via_email
from users.models import User
from django.contrib.auth import authenticate


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


# user registration using google account 
class GoogleRegisterView(APIView):
    def post(self, request):
        accountExist = True
        try:
            google_request = requests.Request()
            id_info = id_token.verify_oauth2_token(
                request.data['client_id'], google_request, "542004528081-920qoaeaj25vg2eclgqlrr01qgoejs3o.apps.googleusercontent.com"
            )
            email = id_info['email']
        except KeyError:
            raise ParseError("Check credential")
        
        if not User.objects.filter(email=email).exists():
            accountExist = False
            username = id_info['given_name'] + id_info['jti'][-4:]
            user = User.objects.create(email=email, username=username, is_active=True, is_varified=True)
            user.save()
        
        user = User.objects.get(email=email)
        if  user.is_active == False :
             raise AuthenticationFailed("Your are blocked by the Admin ! ")
        refresh = RefreshToken.for_user(user)
        refresh["username"] = str(user.username)
        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'is_admin': user.is_superuser,
             'accountExist': accountExist,
        }
        return Response(content,status=status.HTTP_200_OK)




class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get (self, request):
        user = User.objects.get(id=request.user.id)

        data = UserSerializer(user).data

        content = data 
        return Response(content)

