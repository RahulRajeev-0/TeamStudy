from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from .models import ChatMessage
from channels.db import database_sync_to_async

class PersonalChatConsumer(AsyncWebsocketConsumer):
    

    # for connecting 
    async def connect(self):
        # group_id = sorted(workspace member id (sender) + workspace member id (receiver))
        self.group_id = self.scope['url_route']['kwargs']['id'] 
        print(self.group_id)
        self.room_group_name = f'chat_{self.group_id}'
        await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
        await self.accept()

        existing_messages = await self.get_existing_messages() 
        for message in existing_messages:
            await self.send(text_data=json.dumps({
                'message': message['message'],
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
        messages = ChatMessage.objects.filter(group_id=self.group_id)
        return [{'message': message.message} for message in messages]
    





    async def chat_message(self, event):
        message = event['data']['message']
        sender_name = event['data']['sendername']
        await self.send(text_data=json.dumps({
            "message":message,
            'sendername':sender_name,
        }))




    # getting the message 
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        sender_name = data.get('username', 'Anonymous')

        # await self.save_message(sender_name, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat.message',
                'data':{
                    'message':message,
                    'sendername':sender_name
                },
            }
        )

    
    @classmethod
    async def send_chat_message(cls, room_group_name, message):
        await cls.send_group(room_group_name, {
            'type': 'chat.message',
            'message': message,
        })



    # for saving the message to the data base 
    # async def save_message(self, sendername, message):
    #     if self.appointment:
    #         sender = await self.get_user_instance(self.appointment.patient_id)
    #         receiver = await self.get_order_instance(self.appointment.doctor_id)
    #         sendername = sendername
    #         await self.save_message_to_db(sender, receiver, sendername, message)
    #     else:
    #         print("Appointment is None. Message not saved.")
    



