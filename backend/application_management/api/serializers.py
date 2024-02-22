from rest_framework import serializers
from users.models import User
from workspaces.models import Workspaces

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active']

class WorkspaceAdminLintingSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    class Meta :
        model = Workspaces
        fields = "__all__"