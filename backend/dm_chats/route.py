from django.urls import path
from .consumers import PersonalChatConsumer


websocket_urlpatterns = [
    path('ws/dm_chats/', PersonalChatConsumer.as_asgi())
]