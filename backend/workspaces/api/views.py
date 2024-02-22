
#  django rest framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# serializers
from workspaces.api.serializers import WorkspaceSerializer

# models
from workspaces.models import Workspaces, WorkspaceMembers


# view for creating a workspace 
class CreateWorkspaceView(generics.CreateAPIView):
    queryset = Workspaces.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated] 

    def perform_create(self, serializer):
        # Automatically set the created_by field to the current authenticated user
        workspace = serializer.save(created_by=self.request.user)

        WorkspaceMembers.objects.create(workspace=workspace,
                                user=self.request.user,
                                is_admin=True,
                                )
        

# view for getting all the workspace that a user joined or created 
class UserWorkspacesListingView(generics.ListAPIView):
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
         # Assuming you're passing user_id in the URL
        user_workspace_memberships = WorkspaceMembers.objects.filter(user=self.request.user)
        user_joined_workspaces = [membership.workspace for membership in user_workspace_memberships]
        return user_joined_workspaces



        

