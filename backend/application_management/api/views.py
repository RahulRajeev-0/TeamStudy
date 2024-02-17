from rest_framework.views import APIView
from users.models import User
from application_management.api.serializers import UserSerializer;
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.response import Response


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user and user.is_authenticated and user.is_superuser
    

class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperUser]
    authentication_classes = [JWTAuthentication] 


class UserIsActiveUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperUser]

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = not instance.is_active  # Toggle the value of is_active
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


