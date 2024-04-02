from channels.generic.websocket import AsyncWebsocketConsumer
import json

class GroupChatConsumer(AsyncWebsocketConsumer):
    
    # handshake and connecting to websocket
    async def connect(self):
        group_id = self.scope['url_route']['kwargs']['id'] 
        self.room_group_name = f'chat_{group_id}'
        await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
        await self.accept()
    
    # disconnecting 
    async def disconnect(self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    
    async def chat_message(self, event):
        message = event['data']['message']
        sender = event['data']['sender']
        await self.send(text_data=json.dumps({
            "message":message,
            'sender':sender,
        }))



    # reciving the message 
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        sender = data.get('sender', 'Anonymous')

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat.message',
                'data':{
                    'message':message,
                    'sender':sender
                },
            }
        )

