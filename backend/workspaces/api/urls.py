from django.urls import path
from . import views


urlpatterns = [
    path('create-workspace/', views.CreateWorkspaceView.as_view(), name="Create-workspace"),
]
