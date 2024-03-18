from django.db import models
from workspaces.models import WorkspaceMembers, Workspaces
# Create your models here.

class WorkspaceGroup(models.Model):
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=178)
    topic = models.CharField(max_length=178)
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
    
