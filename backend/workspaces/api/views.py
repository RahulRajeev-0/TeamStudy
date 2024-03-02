
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




# view for sending the invitation to add a user to a workspace 
class SendInvitationView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            # getting data workspac id and user id
            workspace_id = request.data.get('workspaceId')  
            member_email = request.data.get("newMember")
            new_member = User.objects.filter(email=member_email).first()
            if not new_member:
                return Response ({"message":"User with this email doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
                
            workspace_obj = WorkspaceMembers.objects.get(workspace=workspace_id, user=request.user)
            if WorkspaceMembers.objects.filter(workspace=workspace_id, user=new_member).exists():
                return Response ({"message":"User is already a member"}, status=status.HTTP_403_FORBIDDEN)
            
            # checking the if the add new member request is from admin
            if workspace_obj.is_admin:
                # WorkspaceMembers.objects.create(user=new_member,workspace=workspace_obj.workspace)
                admin = request.user.username
                workspace = workspace_obj.workspace.workspace_name
                send_workspace_invitation(member_email, new_member.id, workspace_id, admin, workspace )
            else:
                return Response ({"message":"Your not an admin"}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print("user not found")
            print(e)
        return Response("user send invitation")


# view for adding the user to the workspace
class AddMemberToWorkspaceView(APIView):
    def post(self, request):
        try: 
            workspace_id = request.data.get('workspaceId')
            user_id = request.data.get('userId')
            user_obj = User.objects.filter(id=user_id).first()
            workspace_obj = Workspaces.objects.filter(id=workspace_id).first()
            if user_obj and workspace_obj :
                if not WorkspaceMembers.objects.filter(user=user_obj,workspace=workspace_obj).exists():
                    WorkspaceMembers.objects.create(user=user_obj, workspace=workspace_obj)
                    return Response({"message":"Joind to the workspace"}, status=status.HTTP_200_OK)
                else:
                    return Response({"message":"You are already a member of the workspace ."}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({"message":"Something wend wrong . Unable to Join to workspace"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)

    
