from django.contrib import admin
from group_chats.models import WorkspaceGroup, WorkspaceGroupMember
# Register your models here.
admin.site.register(WorkspaceGroup)
admin.site.register(WorkspaceGroupMember)