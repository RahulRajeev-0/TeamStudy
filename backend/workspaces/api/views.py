
#  django rest framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework.parsers import MultiPartParser, FormParser
# serializers
from workspaces.api.serializers import WorkspaceSerializer, WorkspaceDetailsSerializer, GetWorkspaceIdSerializer, WorkspaceMemberSerializer, UserWorkspaceProfileSerializer 
# models
from workspaces.models import Workspaces, WorkspaceMembers, InvitationToken
from users.models import User

from workspaces.emails import send_workspace_invitation




# view for creating a workspace 
class CreateWorkspaceView(generics.CreateAPIView):
    queryset = Workspaces.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated] 

    def perform_create(self, serializer):
        # Automatically set the created_by field to the current authenticated user
        workspace = serializer.save(created_by=self.request.user, 
                                    is_active=True)

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
        user_joined_workspaces = [
            membership.workspace for membership in user_workspace_memberships
            if membership.workspace.is_active
            ]
        return user_joined_workspaces


# view for getting basic workspace details
class WorkspaceDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, workspace_id):
        try: 
            workspace = Workspaces.objects.get(id=workspace_id, is_active=True)
            member = WorkspaceMembers.objects.get(workspace=workspace,
                                                   user=request.user)
        except:
            return Response({"error": "Workspace not available or You not a member"},
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
            # getting the workspace member  
            workspace_obj = WorkspaceMembers.objects.get(
                workspace=workspace_id,
                  user=request.user)
            
            # checking if the member is already a member
            if WorkspaceMembers.objects.filter(workspace=workspace_id,
                                                user=new_member).exists():
                return Response ({"message":"User is already a member"},
                                  status=status.HTTP_403_FORBIDDEN)
            
            # checking the if the add new member request is from admin
            if workspace_obj.is_admin:
                admin = request.user.username # for the mail (showing who invited user to join)
                workspace = workspace_obj.workspace.workspace_name  # for the showing the workspace name in the email
                send_workspace_invitation(member_email,
                                            new_member,
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
            token = request.data.get('token')
            invitation_obj = InvitationToken.objects.filter(token=token).first()
            if invitation_obj :
                if not WorkspaceMembers.objects.filter(
                    user=invitation_obj.user,
                    workspace=invitation_obj.workspace_id
                    ).exists():
                    workspace = Workspaces.objects.get(id=invitation_obj.workspace_id)
                    WorkspaceMembers.objects.create(user=invitation_obj.user,
                                                     workspace=workspace)
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


  # change the name of the workspace 
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


# change the description of a workspace
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


# a user leaving from workspace 
class MemberLeaveWorkspaceView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            member = WorkspaceMembers.objects.get(
                workspace=request.data.get("workspaceId"),
                user = request.user)
            if member.workspace.created_by != request.user:
                member.delete()
                return Response({"message":"Exited from the workspace"},
                                 status=status.HTTP_200_OK)
            else:
                return Response({"message":"You are the Owner You cannot leave"},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"message":"Something went wronge , Unable to exit from workspace"},
                             status=status.HTTP_400_BAD_REQUEST)
        


# view for deleting the workpace
class DeleteWorkspaceView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            workspace = Workspaces.objects.get(id=request.data.get("workspaceId"))
            if request.user == workspace.created_by:
                workspace.delete()
                return Response({"message":"Workspace Deleted Successfully"},
                                 status=status.HTTP_200_OK)
            else:
                return Response ({"message":"Only owner can delete workpace"},
                                 status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response ({"message":"Something went wrong "},
                                 status=status.HTTP_400_BAD_REQUEST)
        



# user profile details in workspace
class UserWorkspaceProfileView(APIView):
    permission_classes = [IsAuthenticated]

    # for getting the user profile deatails inside the workspace 
    def get(self, request, workspace_id):
        try:
            member = WorkspaceMembers.objects.get(
                workspace=workspace_id, 
                user=request.user
                )
            
        except Exception as e:
            print(e)
            return Response({"message":"member not found"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserWorkspaceProfileSerializer(member)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    

    # for updating user profile inside the workspace 
    def put(self, request, workspace_id):
        try:
            member = WorkspaceMembers.objects.get(
                workspace=workspace_id, 
                user=request.user
                )
            
        except Exception as e:
            print(e)
            return Response({"message":"member not found"}, status=status.HTTP_400_BAD_REQUEST)
        member.display_name = request.data.get('displayName')
        member.about_me = request.data.get('about')
        member.phone_no = request.data.get('phone')
        member.save()
        serializer = UserWorkspaceProfileSerializer(member)
        return Response(
            {
                "message":"Profile Updated successfully ", 
                "data": serializer.data
            }, 
            status=status.HTTP_200_OK
            )
    

    def patch(self, request, workspace_id):
        try:
            member = WorkspaceMembers.objects.get(
                workspace=workspace_id, 
                user=request.user
                )
        except Exception as e:
            print(e)
            return Response({"message":"member not found"},
                             status=status.HTTP_400_BAD_REQUEST)
        member.profile_pic = request.data.get('profilePic')
        member.save()
        serializer = UserWorkspaceProfileSerializer(member)
        
        return Response(
            {
                "message":"Profile Updated successfully ", 
                "data":serializer.data
                }, 
                status=status.HTTP_200_OK
                )



            
