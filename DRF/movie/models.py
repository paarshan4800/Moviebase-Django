from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.

class Movie(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    imdbID = models.CharField(max_length=100,null=True)
    Title = models.CharField(max_length=400,null=True)
    Year = models.CharField(max_length=10,null=True)
    Poster = models.URLField(max_length=400,null=True)

    def __str__(self):
        return self.Title
