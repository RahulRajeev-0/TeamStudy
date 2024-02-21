from rest_framework import serializers
from workspaces.models import WorkspaceMembers, Workspaces


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta :
        model = Workspaces
        exclude = ['password', 'created_by']




