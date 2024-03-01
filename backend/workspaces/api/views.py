
#  django rest framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# serializers
from workspaces.api.serializers import WorkspaceSerializer, WorkspaceDetailsSerializer, GetWorkspaceIdSerializer
from ..emails import send_workspace_invitation
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


'''currently the function is in developing stage , right now 
-> if the function is called the user will be added to that workspace without sending a email request
-> email will be sented to the user if there is user with that email id 
-> not the request to accept the '''


class SendInvitationView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            # getting workspace id
            workspace_id = request.data.get('workspaceId')  
            # email of the new member (add to workspace)
            member_email = request.data.get("newMember")
            # getting the from the data base
            new_member = User.objects.filter(email=member_email).first()
            if not new_member:
                print("++++++++++++++")
                print(new_member)
            # checking the if the add new member request is from admin
            workspace_obj = WorkspaceMembers.objects.get(workspace=workspace_id, user=request.user)
            if workspace_obj.is_admin:
                # WorkspaceMembers.objects.create(user=new_member,workspace=workspace_obj.workspace)
                admin = request.user.username
                workspace = workspace_obj.workspace.workspace_name
                send_workspace_invitation(member_email, new_member.id, workspace_id, admin, workspace )
        except Exception as e:
            print("user not found")
            print(e)
        return Response("user send invitation")