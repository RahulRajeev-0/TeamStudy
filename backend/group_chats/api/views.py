#  django rest framework
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.exceptions import NotFound

# models
from group_chats.models import  WorkspaceGroupMember, WorkspaceGroup
from workspaces.models import WorkspaceMembers, Workspaces

# serializers 
from group_chats.api.serializers import WorkspaceGroupSerializer


# =================================== views =================================


class CreateWorkspaceGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, workspace_id, member_id):
        try:
            # Retrieve member and workspace or raise 404 if not found
            member = WorkspaceMembers.objects.get(id=member_id)
            workspace = Workspaces.objects.get(id=workspace_id)
        except WorkspaceMembers.DoesNotExist:
            return Response({"message":"Member not found"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        except Workspaces.DoesNotExist:
            return Response({"message":"Workspace not found"}, 
                            status=status.HTTP_400_BAD_REQUEST)

        # Validate permissions
        if not member.is_admin:
            return Response({"message": "Only Admin Can Create A Group"}, 
                            status=status.HTTP_403_FORBIDDEN)
        group_name = request.data.get("name")
        if group_name:
            if WorkspaceGroup.objects.filter(workspace=workspace_id, name=group_name).exists():
                return Response({"message":"Workspace with this Name already exists"}, 
                                status=status.HTTP_406_NOT_ACCEPTABLE)

        # Create the group
        serializer = WorkspaceGroupSerializer(data=request.data)
        if serializer.is_valid():
            
            group = serializer.save(created_by=member, 
                                    workspace=workspace)
          
            WorkspaceGroupMember.objects.create(group=group, member=member)
            return Response({"message": "New Group Created"}, 
                            status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, 
                            status=status.HTTP_400_BAD_REQUEST)


# for group listing 
    def get (self, request, workspace_id, member_id):
        try:
            
            groups = WorkspaceGroup.objects.filter(workspace=workspace_id)
            print(groups)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)







# view for deleting , updating the info of a workspace group
class WorkspaceGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, group_id, member_id):
        try:
            # Retrieve member and workspace or raise 404 if not found
            member = WorkspaceMembers.objects.get(id=member_id)
            group = WorkspaceGroup.objects.get(id=group_id)
        except WorkspaceMembers.DoesNotExist:
            return Response({"message":"Member not found"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        except WorkspaceGroup.DoesNotExist:
            return Response({"message":"Group not found"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        if member.is_admin:
            group.delete()
            return Response({"messages":"Group deleted Successfully"}, 
                            status=status.HTTP_200_OK)
        else:
            return Response({"message":"Your not an admin, only admins can delete groups"}, 
                            status=status.HTTP_403_FORBIDDEN)   


    def put(self, request, group_id, member_id):
        try:
            name = request.data.get('name')
            description = request.data.get('description')
            topic = request.data.get('topic')

            group = WorkspaceGroup.objects.get(id=group_id) # getting the group
            member = WorkspaceMembers.objects.get(member_id) # getting the member who made the request
        except Exception as e:
            print(e)
            return Response({"message":"something went wrong"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        # checking if name of is already been used in another group 
        if name:
            if WorkspaceGroup.objects.filter(workspace=member.workspace, name=name).exists():
                return Response({"message":"This name is already taken"}, 
                                status=status.HTTP_406_NOT_ACCEPTABLE)


        if member.is_admin:
            group.name = name
            group.description = description
            group.topic = topic
            group.save()
            return Response({"messages":"Updated Successfully"}, 
                            status=status.HTTP_200_OK)
        else:
            return Response({"message":"Your not an admin, only admins can edit groups info"}, 
                            status=status.HTTP_403_FORBIDDEN)  


        




        
         
      

    
    