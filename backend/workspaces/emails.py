from django.core.mail import send_mail
from django.conf import settings

def send_workspace_invitation(email, userId, workspaceId, admin, workspace):
    subject = f"Invitation to Join [{workspace}] Workspace"
    url = f"http://localhost:5173/workspace-invitation/{userId}/{workspaceId}"
    message = f"You've been invited to join the [{workspace}] workspace \n invited by : {admin} \n click the link to accept : {url} "
    email_from = settings.EMAIL_HOST 
    send_mail(subject, message, email_from, [email])