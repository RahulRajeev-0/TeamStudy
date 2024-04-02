"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from .urls import websocket_urlpatterns
# from channels.auth import AuthMiddlewareStack






os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()




application = ProtocolTypeRouter({
    "http":application,
    "websocket":URLRouter(websocket_urlpatterns)
})
