from django.db import models

# Create your models here.
from django.db import models

class UserCredential(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.username



# models.py
from django.db import models

class Destination(models.Model):
    title = models.CharField(max_length=100)
    tags = models.TextField()
    duration = models.CharField(max_length=100)
    price = models.IntegerField()
    rating = models.FloatField()
    image_url = models.URLField()
