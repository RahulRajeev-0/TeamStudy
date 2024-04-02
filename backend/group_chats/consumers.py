from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from .models import GroupChatMessage
from workspaces.models import WorkspaceMembers


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

        existing_messages = await self.get_existing_messages() 
        for message in existing_messages:
            await self.send(text_data=json.dumps({
                'message': message['message'],
                'sender': message['sender']
            }))
    
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

        if sender:
            await self.save_message(sender, message)

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


    # ---------------- message saving to data base (related funtions) --------------------

        # funtion for getting the previous messages in the database 
    @database_sync_to_async
    def get_existing_messages(self):
        messages = GroupChatMessage.objects.filter(group=self.room_group_name)
        return [{'message': message.message, 'sender': message.sender.id} for message in messages]
    

    # function for saving the data -> this will call the function to save data to the database
    async def save_message(self, sender, message):
        if sender:
            sender = await self.get_member_instance(sender)
            await self.save_message_to_db(sender, message)
        else:
            print("sender id not found ")


    @database_sync_to_async
    def get_member_instance(self, member_id):
        try:
            if member_id != 'Anonymous':
                member = WorkspaceMembers.objects.get(id=int(member_id))
                return member
            else:
                return 
        except WorkspaceMembers.DoesNotExist:
            print("can't find the member")

    
    @database_sync_to_async
    def save_message_to_db(self, sender, message):
        if sender:
            GroupChatMessage.objects.create(
                sender=sender,
                message=message,
                group=self.room_group_name,
            )
            print("Message saved to database.")
        else:
            print("Sender is None. Message not saved.")




