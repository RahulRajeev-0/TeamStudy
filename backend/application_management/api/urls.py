from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.ApplicationManagementLogin.as_view(), name="appication_management_login"),
]
