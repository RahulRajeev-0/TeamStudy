from rest_framework import serializers
# models
from users.models import User
from workspaces.models import WorkspaceMembers

#  serializers
from workspaces.api.serializers import UserNameSerializer

class UserWorkspaceProfileSerializer(serializers.ModelSerializer):
    user = UserNameSerializer()
    class Meta:
        model = WorkspaceMembers
        fields = ['id','display_name','user' ,'phone_no', 'is_admin', 'about_me', 'profile_pic']
