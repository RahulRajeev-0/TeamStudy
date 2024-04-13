from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from .models import ChatMessage
from workspaces.models import WorkspaceMembers
from channels.db import database_sync_to_async

class PersonalChatConsumer(AsyncWebsocketConsumer):
    

    # for connecting 
    async def connect(self):
        # group_id = sorted(workspace member id (sender) + workspace member id (receiver))
        user_id1 = self.scope['url_route']['kwargs']['user_id1'] 
        user_id2 = self.scope['url_route']['kwargs']['user_id2'] 
        user_ids = [int(user_id1), int(user_id2)]
        print(user_ids)
        user_ids = sorted(user_ids)
        self.room_group_name = f'chat_{user_ids[0]}-{user_ids[1]}'
        await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
        await self.accept()

        existing_messages = await self.get_existing_messages() 
        for message in existing_messages:
            formatted_time = message['time'].strftime("%Y-%m-%d %H:%M:%S")
            await self.send(text_data=json.dumps({
                'message': message['message'],
                'sender': message['sender'],
                'time': formatted_time 
            }))


    # disconnecting 
    async def disconnect(self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )



    # getting the previous chats 
    @database_sync_to_async
    def get_existing_messages(self):
        messages = ChatMessage.objects.filter(group=self.room_group_name)
        return [{'message': message.message, 'sender': message.sender.id, 'time':message.time_stamp} for message in messages]
    





    async def chat_message(self, event):
        message = event['data']['message']
        sender = event['data']['sender']
        time = event['data']['time']
        await self.send(text_data=json.dumps({
            "message":message,
            'sender':sender,
            'time':time,
        }))



    # function for saving the data -> this will call the function to save data to the database
    async def save_message(self, sender, message):
        if sender:
            sender = await self.get_member_instance(sender)
            await self.save_message_to_db(sender, message)
        else:
            print("sender id not found ")


    
    # for video call notification 
   # for video call notification 
    async def video_link_receive(self, link, sender):
        """
        Sends a video call link to the client.
        """
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'video_call_link',
                'data': {
                    'link':link,
                    'sender':sender
                },  # Send 'link' directly in the event
            }
        )

        
    async def video_call_link(self, event):
        """
        Sends a video call link to the client.
        """
        link = event['data']['link']  # Access 'link' directly from the event
        sender = event['data']['sender']  
        await self.send(text_data=json.dumps({
            'type': 'video_call',
            'sender':sender,
            'link':link
            
        }))


    async def audio_link_receive(self, link, sender):
        """
        Sends a video call link to the client.
        """
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'audio_call_link',
                'data': {
                    'link':link,
                    'sender':sender
                },    # Send 'link' directly in the event
            }
        )

        
    async def audio_call_link(self, event):
        """
        Sends a video call link to the client.
        """
        link = event['data']['link']  # Access 'link' directly from the event
        sender = event['data']['sender']  
        await self.send(text_data=json.dumps({
            'type': 'audio_call',
            'link': link,
            'sender':sender
        }))

    
       


    # getting the message 
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data.get('message',"")
        sender = data.get('sender', 'Anonymous') 
        time = data.get('time','unkown')

        if data.get('type') == 'video_call':
            link = data.get('link', '')
            # Handle the call message as needed
            print(f"Received video call: {message}, link: {link}")
            # You can send the video call link to the clients in the group
            await self.video_link_receive(link, sender)
        
        if data.get('type') == 'audio_call':
            link = data.get('link','')
            print(f"Received audio call: {message}, link: {link}")
            await self.audio_link_receive(link, sender)
            
            
       

        if sender:
            await self.save_message(sender, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',
                'data':{
                    'message':message,
                    'sender':sender,
                    'time':time,
                },
            }
        )

    
    @classmethod
    async def send_chat_message(cls, room_group_name, message):
        await cls.send_group(room_group_name, {
            'type': 'chat.message',
            'message': message,
        })


   
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
            ChatMessage.objects.create(
                sender=sender,
                message=message,
                group=self.room_group_name,
            )
            print("Message saved to database.")
        else:
            print("Sender is None. Message not saved.")

            
