from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *

class UserRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200)
    password2 = serializers.CharField(max_length=200)
    class Meta:
        model = User
        fields = ['username','email','password','password2']
        #,'password1','password2'

    def save(self):
        username = self.validated_data['username']
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"msg":"Username already exists"})
        
        email = self.validated_data['email']
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'msg':"Email already in use"})

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'msg':"Passwords not matching"})

        user = User.objects.create_user(username=username,email=email,password=password)
        return user


class UserLoginSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=200)
    username = serializers.CharField(max_length=200)



class MovieDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['imdbID','Title','Year','Poster']