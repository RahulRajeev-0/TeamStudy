from django.urls import path
from . import views


urlpatterns = [
    path('create-workspace/', views.CreateWorkspaceView.as_view(), name="Create-workspace"),
    path('user-workspace-list/', views.UserWorkspacesListingView.as_view(), name="User-workspace-listing"),
]
