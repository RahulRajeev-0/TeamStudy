from django.db import models
from workspaces.models import Workspaces
from django.utils import timezone

# Create your models here.
class PremiumPayments(models.Model):
    workspace = models.ForeignKey(Workspaces, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Payment for {self.workspace.workspace_name} on {self.payment_date}"