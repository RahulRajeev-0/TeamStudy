from django.db import models
from workspaces.models import WorkspaceMembers
# Create your models here.

class ChatMessage(models.Model):
    sender = models.ForeignKey(WorkspaceMembers, on_delete=models.CASCADE, related_name='send_messages')
    receiver = models.ForeignKey(WorkspaceMembers, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TimeField(default="", null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True)
    group_id = models.PositiveBigIntegerField()
    sender_name = models.TextField(max_length=100, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    is_send = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender} to {self.receiver}: {self.message}'

