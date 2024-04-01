from django.urls import path
from .consumers import PersonalChatConsumer


websocket_urlpatterns = [
    path('ws/dm_chats/<int:user_id1>/<int:user_id2>/', PersonalChatConsumer.as_asgi())
]