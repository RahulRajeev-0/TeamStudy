from django.contrib import admin
from group_chats.models import WorkspaceGroup, WorkspaceGroupMember, GroupChatMessage
# Register your models here.
admin.site.register(WorkspaceGroup)
admin.site.register(WorkspaceGroupMember)
admin.site.register(GroupChatMessage)