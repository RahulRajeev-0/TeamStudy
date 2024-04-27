from django.urls import path
from . import views


urlpatterns = [
    path('chat/',views.ChatbotView.as_view(),name='chatbot'),
]