# Generated by Django 5.0.1 on 2024-03-31 16:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dm_chats', '0002_alter_chatmessage_group_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatmessage',
            old_name='group_id',
            new_name='group',
        ),
    ]
