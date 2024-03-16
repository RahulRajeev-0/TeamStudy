from django.core.mail import send_mail
from django.conf import settings
import uuid
from workspaces.models import InvitationToken

# for creating token 
def generate_token():
    return str(uuid.uuid4())

def send_workspace_invitation(email, newMember, workspaceId, admin, workspace):
    # creating token and storing in token table 
    token = generate_token()
    InvitationToken.objects.create(
        user=newMember, 
        workspace_id=workspaceId, 
        token=token
        )
    subject = f"Invitation to Join [{workspace}] Workspace"
    url = f"http://localhost:5173/workspace-invitation/{token}/"
    message = f"You've been invited to join the [{workspace}] workspace \n invited by : {admin} \n click the link to accept : {url} "
    email_from = settings.EMAIL_HOST 
    send_mail(subject, message, email_from, [email])