from rest_framework import serializers 
from group_chats.models import WorkspaceGroup
from workspaces.api.serializers import UserNameSerializer

from workspaces.models import WorkspaceMembers

class WorkspaceGroupSerializer(serializers.ModelSerializer):
    class Meta :
        model = WorkspaceGroup
        exclude = ['created_by', 'workspace']


class WorkspaceGroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkspaceGroup
        fields = ['id', 'name', 'is_private',]


class WorkspaceMembersSerializer(serializers.ModelSerializer):
    user = UserNameSerializer()
    class Meta:
        model = WorkspaceMembers
        fields = ['id','display_name', 'user' ]