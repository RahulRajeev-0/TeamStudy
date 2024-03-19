from rest_framework import serializers 
from rest_framework.serializers import CharField, Serializer
from users.models import User
from workspaces.models import WorkspaceMembers, Workspaces


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta :
        model = Workspaces
        exclude = ['password', 'created_by']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active']


# serializer for getting a workspace details 
class WorkspaceDetailsSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    class Meta :
        model = Workspaces
        exclude = ['password']


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class WorkspaceMemberSerializer(serializers.ModelSerializer):
    user = UserNameSerializer()
    class Meta :
        model = WorkspaceMembers
        exclude = ['profile_pic']



class GetWorkspaceIdSerializer(Serializer):
    workspaceId = CharField()


# serializer for user profile inside the workspace
class UserWorkspaceProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkspaceMembers
        fields = ['id','display_name', 'phone_no', 'is_admin', 'about_me', 'profile_pic']
