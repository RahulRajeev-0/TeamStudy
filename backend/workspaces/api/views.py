
#  django rest framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# serializers
from workspaces.api.serializers import WorkspaceSerializer, WorkspaceDetailsSerializer, GetWorkspaceIdSerializer, WorkspaceMemberSerializer
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


# view for getting basic workspace details
class WorkspaceDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, workspace_id):
        try: 
            workspace = Workspaces.objects.get(id=workspace_id)
            member = WorkspaceMembers.objects.get(workspace=workspace,
                                                   user=request.user)
        except:
            return Response({"error": "Workspace does not exist or You not a member"},
                             status=status.HTTP_404_NOT_FOUND)
        serializer = WorkspaceDetailsSerializer(workspace)
        return Response(serializer.data, status=status.HTTP_200_OK)


# view for member manage in workspace
class WorkspaceMemberView(APIView):
    permission_classes = [IsAuthenticated]

    # member listing
    def get(self, request):
        try:
            workspace_id = request.query_params.get('workspaceId')
            user_obj = WorkspaceMembers.objects.filter(user=request.user,
                                                        workspace=workspace_id).first()
            
            if user_obj.is_admin:
                workspace_members = WorkspaceMembers.objects.filter(workspace=workspace_id)
                serilizer = WorkspaceMemberSerializer(workspace_members, many=True)
                return Response(data=serilizer.data, status=status.HTTP_200_OK)

            else:
                return Response({'message':"not an admin"}, 
                                status=status.HTTP_403_FORBIDDEN)
                
            
        except Exception as e:
            print(e)
            return Response({"message":"something went wrong"},
                            status=status.HTTP_400_BAD_REQUEST)


        '''alter the workspace member model and owner field there 
        so when checking removing the position we can check if the member is the owner'''
        #for updating the position of members like admin / not admin  
    def put(self, request):
        try:
           request_from = WorkspaceMembers.objects.filter(
               user=request.user, 
               workspace=request.data.get("workspaceId")).first()
           if request_from.is_admin:
               workspace_member = WorkspaceMembers.objects.get(id=request.data.get('memberId'))
               if workspace_member.user == request.user:
                   return Response({"message":"You cannot change your own position"},
                                    status=status.HTTP_403_FORBIDDEN)
               workspace_member.is_admin = not workspace_member.is_admin
               workspace_member.save()
               return Response({"message":"Updation Successful"}, 
                               status=status.HTTP_200_OK)
           else:
               return Response({"message":"Not an admin"}, 
                               status=status.HTTP_403_FORBIDDEN)
           
        
        except Exception as e:
            print(e)
            return Response({'message':"something went wrong "},
                             status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request):
        try:
           
            request_from = WorkspaceMembers.objects.filter(
                user=request.user,
                workspace=request.data.get("workspaceId")).first()
            if request_from.is_admin:
                workspace_member = WorkspaceMembers.objects.get(id=request.data.get('memberId'))
                if workspace_member.workspace.created_by == workspace_member.user:
                    return Response ({"message":"Owner cannot leave workspace"},
                                      status=status.HTTP_403_FORBIDDEN)
                if workspace_member.user == request.user:
                    return Response({'message':"Cannot kick your self out"},
                                     status=status.HTTP_403_FORBIDDEN)
                workspace_member.delete()
                return Response({"message":"Member kicked out from the workspace"},
                                 status=status.HTTP_200_OK)
            else:
                return Response({"message":"Your not an admin "},
                                 status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong"},
                             status=status.HTTP_400_BAD_REQUEST)




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
                return Response ({"message":"User with this email doesn't exist"},
                                  status=status.HTTP_404_NOT_FOUND)
                
            workspace_obj = WorkspaceMembers.objects.get(
                workspace=workspace_id,
                  user=request.user)
            
            if WorkspaceMembers.objects.filter(workspace=workspace_id,
                                                user=new_member).exists():
                return Response ({"message":"User is already a member"},
                                  status=status.HTTP_403_FORBIDDEN)
            
            # checking the if the add new member request is from admin
            if workspace_obj.is_admin:
                # WorkspaceMembers.objects.create(user=new_member,workspace=workspace_obj.workspace)
                admin = request.user.username
                workspace = workspace_obj.workspace.workspace_name
                send_workspace_invitation(member_email,
                                            new_member.id,
                                            workspace_id,
                                            admin, 
                                            workspace )
            else:
                return Response ({"message":"Your not an admin"},
                                  status=status.HTTP_403_FORBIDDEN)
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
                if not WorkspaceMembers.objects.filter(user=user_obj,
                                                       workspace=workspace_obj).exists():
                    WorkspaceMembers.objects.create(user=user_obj,
                                                     workspace=workspace_obj)
                    return Response({"message":"Joind to the workspace"},
                                     status=status.HTTP_200_OK)
                else:
                    return Response({"message":"You are already a member of the workspace ."},
                                     status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({"message":"Something wend wrong . Unable to Join to workspace"},
                                 status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)

    
class ChangeWorkspaceNameView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            new_name = request.data.get("newName")
            workspace = Workspaces.objects.get(id=request.data.get("workspaceId"))
            if workspace.created_by == request.user:
                workspace.workspace_name = new_name
                workspace.save()
                return Response({"message":"Name Updated Successfully"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"message":"Only Owner can update workspace name"},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong"},
                                status=status.HTTP_400_BAD_REQUEST)



class ChangeWorkspaceDescriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            new_description = request.data.get("newDescription")
            workspace = Workspaces.objects.get(id=request.data.get("workspaceId"))
            if workspace.created_by == request.user:
                workspace.description = new_description
                workspace.save()
                return Response({"message":"Description Updated Successfully"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"message":"Only Owner can update workspace Description "},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"message":"Something went wrong"},
                                status=status.HTTP_400_BAD_REQUEST)
        
