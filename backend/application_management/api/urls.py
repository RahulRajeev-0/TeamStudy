from django.urls import path
from . import views

urlpatterns = [
    path('userListing/', views.UserListView.as_view(), name="User-listing-view"),
]
