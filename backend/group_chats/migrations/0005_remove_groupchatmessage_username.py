# Generated by Django 5.0.1 on 2024-04-02 18:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('group_chats', '0004_groupchatmessage_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groupchatmessage',
            name='username',
        ),
    ]
