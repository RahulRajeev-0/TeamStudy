"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

# media file 
from django.conf import settings
from django.conf.urls.static import static


# websocket 
from dm_chats.consumers import PersonalChatConsumer
from group_chats.consumers import GroupChatConsumer

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('users.api.urls')),
    path('application_management/', include('application_management.api.urls')),
    path('workspace/', include('workspaces.api.urls')),
    path('group/', include('group_chats.api.urls')),
    path('dm/', include('dm_chats.api.urls')),
    path('payment/', include('premium_and_payment.api.urls')),
    path('chatbot/', include('chatbot.api.urls')),
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




websocket_urlpatterns = [
     path('ws/dm_chats/<int:user_id1>/<int:user_id2>/', PersonalChatConsumer.as_asgi()),
     path('ws/group_chats/<int:id>/', GroupChatConsumer.as_asgi())

]