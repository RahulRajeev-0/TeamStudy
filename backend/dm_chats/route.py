from django.urls import path
from .consumers import PersonalChatConsumer


websocket_urlpatterns = [
    path('ws/dm_chats/<int:id>/', PersonalChatConsumer.as_asgi())
]