from django.urls import path
from . import views

urlpatterns = [
    path('user-listing/', views.UserListView.as_view(), name="User-listing-view"),
    path('user-block/<int:pk>/', views.UserIsActiveUpdateView.as_view(), name="User-block-unblock"),
]
