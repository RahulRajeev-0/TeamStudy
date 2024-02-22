from django.urls import path
from . import views

urlpatterns = [
    # ------------------ urls for user management ------------------------
    path('user-listing/', views.UserListView.as_view(), name="User-listing-view"),
    path('user-block/<int:pk>/', views.UserIsActiveUpdateView.as_view(), name="User-block-unblock"),

    # ------------------ urls for workspace management  -----------------------
    path('workspace-listing/', views.WorkspacesListView.as_view(), name="Workspace-listing-view"),
]
