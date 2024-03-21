from django.urls import path
from . import views

urlpatterns = [
    path('workspace-group-create/<int:workspace_id>/<int:member_id>/', views.CreateWorkspaceGroupView.as_view(), name="workspace-group-create"),
    path('workspace-group/<int:group_id>/<int:member_id>/', views.WorkspaceGroupView.as_view(), name="workspace-group"),
    path('workspace-group-list/<int:workspace_id>/<int:workspace_member_id>/', views.WorkspaceGroupListAPIView.as_view(), name="workspace-group"),
]
