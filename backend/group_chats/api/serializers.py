from rest_framework import serializers 
from group_chats.models import WorkspaceGroup


class WorkspaceGroupSerializer(serializers.ModelSerializer):
    class Meta :
        model = WorkspaceGroup
        exclude = ['created_by', 'workspace']

