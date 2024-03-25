from django.db import models
from users.models import User


# Create your models here.

# workspace and details
class Workspaces(models.Model) :
    workspace_name = models.CharField(max_length=50, unique = False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=250)
    is_premium = models.BooleanField(default=False)
    create_on = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=50, null=True, blank=True)
    is_active = models.BooleanField(default=True, blank=True, null= True)

    def __str__(self):
        return self.workspace_name
    
#  details of the member of a workspace
class WorkspaceMembers(models.Model):
    workspace = models.ForeignKey(Workspaces, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=50, null=True, blank=True)
    phone_no = models.IntegerField(blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    about_me = models.CharField(max_length=100, null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pic', null=True, blank=True)


    def __str__(self):
        return self.user.username
    

# for user joining to workspace 
class InvitationToken(models.Model):
    workspace_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username
    

