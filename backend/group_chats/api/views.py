#  django rest framework
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.exceptions import NotFound
from django.db.models import Q


# models
from group_chats.models import  WorkspaceGroupMember, WorkspaceGroup
from workspaces.models import WorkspaceMembers, Workspaces

# serializers 
from group_chats.api.serializers import WorkspaceGroupSerializer, WorkspaceGroupListSerializer, WorkspaceMembersSerializer
from workspaces.api.serializers import WorkspaceMemberListing

# =================================== views =================================

# for creating a workspace
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






class WorkspaceGroupListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkspaceGroupListSerializer

    def get_queryset(self):
        workspace_id = self.kwargs['workspace_id']
        workspace_member_id = self.kwargs['workspace_member_id']
        
        queryset = WorkspaceGroup.objects.filter(workspace_id=workspace_id, is_private=False)
        queryset = queryset.exclude(
            Q(is_private=True) & ~Q(workspacegroupmember__member_id=workspace_member_id)
        )
        
        return queryset




# view for deleting , updating the info of a workspace group
class WorkspaceGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, group_id, member_id):
        try:
            group = WorkspaceGroup.objects.get(id=group_id)
            member = WorkspaceMembers.objects.get(id=member_id)
        except Exception as e:
            print(e)
            return Response({"message":"Unable to get Channel Info"})
        
        if WorkspaceGroupMember.objects.filter(member=member, group=group).exists():
            serializer = WorkspaceGroupSerializer(group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Your not a member of the Group'}, status=status.HTTP_403_FORBIDDEN)
        



    # for deleting a workspace group
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
            is_private = request.data.get('is_private')
            

            group = WorkspaceGroup.objects.get(id=group_id) # getting the group
            member = WorkspaceMembers.objects.get(id=member_id) # getting the member who made the request
        except Exception as e:
            print(e)
            return Response({"message":"something went wrong"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        # checking if name of is already been used in another group 
        if name and name != group.name:
            if WorkspaceGroup.objects.filter(workspace=member.workspace, name=name).exists():
                return Response({"message":"This name is already taken"}, 
                                status=status.HTTP_406_NOT_ACCEPTABLE)


        if member.is_admin:
            group.name = name
            group.description = description
            group.topic = topic
            group.is_private = is_private
            group.save()
            serializer = WorkspaceGroupSerializer(group)
            return Response(
                {
                    "messages":"Updated Successfully", 
                    'data':serializer.data
                }, 
                status=status.HTTP_200_OK)
        else:
            return Response({"message":"Your not an admin, only admins can edit groups info"}, 
                            status=status.HTTP_403_FORBIDDEN)  



class WorkspaceGroupMemberView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, group_id, member_id, request_id):
        try:
            group = WorkspaceGroup.objects.get(id=group_id)
        except Exception as e:
            print (e)
            return Response({'message':'Unable find the group'},
                             status=status.HTTP_400_BAD_REQUEST)

        try:        
            request_from = WorkspaceMembers.objects.get(id=request_id)
            if request_from.is_admin:
                new_member = WorkspaceMembers.objects.get(id=member_id)
                WorkspaceGroupMember.objects.create(
                    group=group, 
                    member=new_member
                    )
                return Response({'message':"Added to channel"}, 
                                status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'message':"Something went wrong"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        



        # for removing the member in a group 
    def delete(self, request, group_id, member_id, request_id):
        try:
            group = WorkspaceGroup.objects.get(id=group_id)
            # member = WorkspaceMembers.objects.get(id=member_id)
            
        except Exception as e:
            print (e)
            return Response({'message':'Unable find the group'},
                             status=status.HTTP_400_BAD_REQUEST)

        try:        
            request_from = WorkspaceMembers.objects.get(id=request_id)
            if request_from.is_admin:
                member = WorkspaceGroupMember.objects.get(id=member_id)
                member.delete()
                return Response({'message':"Removed from Channel"}, 
                                status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message':"Something went wrong"}, 
                            status=status.HTTP_400_BAD_REQUEST)


from django.db.models import Q
# view for getting the workspace members list who is not in the group or channel (for adding member to the group  listing)
class NotMemberOfGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request, group_id, request_id, workspace_id):
        try:
        # Retrieve the group 
            group = WorkspaceGroup.objects.get(id=group_id)
            print(group.name)
            # Retrieve members who are not part of the group
            all_members = WorkspaceMembers.objects.filter(workspace=workspace_id)
            group_member_ids = WorkspaceGroupMember.objects.filter(group=group).values_list('member__id', flat=True)
            filtered_members = all_members.exclude(id__in=group_member_ids)

            request_from = WorkspaceMembers.objects.get(id=request_id)
            if request_from.is_admin:
                serializer = WorkspaceMembersSerializer(filtered_members, many=True)
                
                return Response(data=serializer.data, status=status.HTTP_200_OK) 
            else:
                return Response ({"message":"You're not an Admin"}, 
                                 status=status.HTTP_403_FORBIDDEN)
        except WorkspaceGroup.DoesNotExist:
            # Handle the case where the group does not exist
            return Response({"message":"Something wend wrong"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        

        

class GroupMembersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, group_id, member_id):
        try:
        # Retrieve the group
            group = WorkspaceGroup.objects.get(id=group_id)
            
            # Retrieve all members of the group along with their display names and usernames
            group_members = WorkspaceGroupMember.objects.filter(group=group).select_related('member__user')
            member = WorkspaceMembers.objects.get(id=member_id)
            # Extract the data you need
            if member.is_admin:
                members_data = []
                for group_member in group_members:
                    id = group_member.id
                    display_name = group_member.member.display_name
                    username = group_member.member.user.username
                    members_data.append({'display_name': display_name, 'username': username, 'id':id})
                
                return Response(data=members_data, status=status.HTTP_200_OK)
            else:
                return Response({'message':"You're not an admin"}, status=status.HTTP_403_FORBIDDEN)
        except WorkspaceGroup.DoesNotExist:
            # Handle the case where the group does not exist
            return Response(data=[], status=status.HTTP_400_BAD_REQUEST)
        
        






        
         
      

    
    