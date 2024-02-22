# Import necessary modules for building API views
from rest_framework.views import APIView  # Import the base class for API views
from rest_framework.generics import ListAPIView, UpdateAPIView  # Import generic class-based views for listing and updating resources

# Import necessary modules for authentication and permissions
from rest_framework.permissions import IsAuthenticated, BasePermission  # Import permission classes for controlling access to views
from rest_framework_simplejwt.authentication import JWTAuthentication  # Import JWT authentication mechanism

# Import necessary modules for working with models and serializers
from users.models import User  # Import the User model
from workspaces.models import Workspaces
from application_management.api.serializers import UserSerializer, WorkspaceAdminLintingSerializer  # Import the serializer for the User model



# Import module for handling HTTP responses
from rest_framework.response import Response  # Import Response class for sending HTTP responses

# Add a line separation for clarity






class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user and user.is_authenticated and user.is_superuser

# -----------------------------------------------  user management --------------------------------------

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




#  -------------------------------- workspace management ---------------------------
    
class WorkspacesListView(ListAPIView) :
    queryset = Workspaces.objects.all()
    serializer_class = WorkspaceAdminLintingSerializer
    permission_classes = [IsSuperUser]
    authentication_classes = [JWTAuthentication] 


