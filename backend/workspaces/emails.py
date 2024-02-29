from django.core.mail import send_mail
from django.conf import settings

def send_workspace_invitation(email):
    subject = "Join workspace Invitation"
    message = "You have been requested to join to the workspace"
    email_from = settings.EMAIL_HOST 
    send_mail(subject, message, email_from, [email])