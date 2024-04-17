from django.db import models
from workspaces.models import WorkspaceMembers
# Create your models here.

class ChatMessage(models.Model):
    sender = models.ForeignKey(WorkspaceMembers, on_delete=models.CASCADE, related_name='send_messages')
    message = models.CharField(default="", null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(default='text_message')
    group = models.CharField(max_length=100)
    is_read = models.BooleanField(default=False)
    is_send = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender}: {self.message}'

