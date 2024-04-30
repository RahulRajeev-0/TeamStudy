from django.db import models

# Create your models here.
class Hello(models.Model):
    name = models.CharField(max_length=50)