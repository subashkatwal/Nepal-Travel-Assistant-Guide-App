from django.db import models

# Create your models here.
from django.db import models

class UserCredential(models.Model):
    username = models.CharField(max_length=50, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True, null=True, blank=True)

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





class PermitApplication(models.Model):
    full_name = models.CharField(max_length=100)
    passport_number = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    destination = models.CharField(max_length=100)
    trip_duration = models.CharField(max_length=50)
    travel_dates = models.CharField(max_length=100, blank=True, null=True)
    special_requests = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.destination}"
