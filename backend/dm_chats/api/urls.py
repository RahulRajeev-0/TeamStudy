from django.urls import path
from . import views

urlpatterns = [
    path('userbasic-info/<int:member_id>/', views.MemberBaseInfo.as_view(), name='get-member-baseInfo' ),
]
