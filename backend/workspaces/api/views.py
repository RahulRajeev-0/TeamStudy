
#  django rest framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# serializers
from workspaces.api.serializers import WorkspaceSerializer

# models
from workspaces.models import Workspaces, WorkspaceMembers



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

        

