from django.contrib import admin
from .models import WorkspaceMembers, Workspaces, InvitationToken
# Register your models here.

admin.site.register(Workspaces)
admin.site.register(WorkspaceMembers)
admin.site.register(InvitationToken)
