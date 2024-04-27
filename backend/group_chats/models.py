from django.db import models
from workspaces.models import WorkspaceMembers, Workspaces
from django.utils import timezone
# Create your models here.


class WorkspaceGroup(models.Model):
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=178)
    topic = models.CharField(max_length=178)
    is_private = models.BooleanField(default=False, blank=True)
    created_by = models.ForeignKey(WorkspaceMembers, on_delete=models.SET_NULL, null=True)
    workspace = models.ForeignKey(Workspaces, on_delete=models.CASCADE)
    create_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

    
class WorkspaceGroupMember(models.Model):
    group = models.ForeignKey(WorkspaceGroup, on_delete=models.CASCADE)
    member = models.ForeignKey(WorkspaceMembers, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.member} {self.group}"
    


class GroupChatMessage(models.Model):
    sender = models.ForeignKey(WorkspaceMembers, on_delete=models.CASCADE, related_name='group_send_messages')
    message = models.CharField(default="", null=True, blank=True)
    time_stamp = models.DateTimeField(default=timezone.now)
    type = models.CharField(default='text_message')
    group = models.CharField(max_length=100)
    is_read = models.BooleanField(default=False)
    is_send = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender}: {self.message}'
