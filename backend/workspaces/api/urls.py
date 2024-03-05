from django.urls import path
from . import views


urlpatterns = [
    path('create-workspace/', views.CreateWorkspaceView.as_view(), name="Create-workspace"),
    path('user-workspace-list/', views.UserWorkspacesListingView.as_view(), name="User-workspace-listing"),

    path('user-workspace-details/<int:workspace_id>/', views.WorkspaceDetailView.as_view(), name="User-workspace-details"),
    path('invite-user/', views.SendInvitationView.as_view(), name="User-workspace-inviate"),
    path('join-user/', views.AddMemberToWorkspaceView.as_view(), name="User-join-workspace"),
    path('member-list/', views.WorkspaceMemberView.as_view(), name='workspace-members'),

    path('change-workspace-name/', views.ChangeWorkspaceNameView.as_view(), name='change-workspace-name'),
    path('change-workspace-description/', views.ChangeWorkspaceDescriptionView.as_view(), name='change-workspace-description'),



]