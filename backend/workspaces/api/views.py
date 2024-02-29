
#  django rest framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# serializers
from workspaces.api.serializers import WorkspaceSerializer, WorkspaceDetailsSerializer

# models
from workspaces.models import Workspaces, WorkspaceMembers
from users.models import User


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



class WorkspaceDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, workspace_id):
        try: 
            workspace = Workspaces.objects.get(id=workspace_id)
        except:
            return Response({"error": "Workspace does not exist"}, status=status.HTTP_404_NOT_FOUND)
        serializer = WorkspaceDetailsSerializer(workspace)
        return Response(serializer.data, status=status.HTTP_200_OK)


        
class SendInvitationView(APIView):
    def post(self, request):
        try:
            print("++++++++++++++++")
            print(request.data.get("email"))
            user_obj = User.objects.get(email=request.data.email)
        except:
            print("user not found")
        return Response("user send invitation")
