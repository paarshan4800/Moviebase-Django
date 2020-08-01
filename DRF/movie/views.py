from django.shortcuts import render
from django.db.models import Count
from django.middleware.csrf import get_token

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .serializers import *

from django.contrib.auth import authenticate,login,logout

@api_view(['POST'])
def UserRegistrationView(request):
    
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        data = {}
        
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            data['status'] = True
            data['response'] = "User " + user.username + " Registered Successfully"
        else:
            data['status'] = False
            data['username'] = serializer.errors
            
        print(data)
        return Response(data)
    
@api_view(['POST'])
def UserLoginView(request):

    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = authenticate(request,username=serializer.data.get('username'),password=serializer.data.get('password'))
            print(user)
            if user is not None:
                token = Token.objects.get(user=user)
                data = {"username":user.username,"token":token.key}
                return Response(data)
            else:
                raise serializers.ValidationError({"msg":"Invalid Email/Password"})
        else:
            raise serializers.ValidationError({"msg":"All fields are required"})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddToLikedListView(request):
    if request.method == 'POST':
        user = request.user
        serializer = MovieDataSerializer(data=request.data)
        if serializer.is_valid():

            movie = Movie.objects.get_or_create(
                user=user,
                imdbID=serializer.validated_data['imdbID'],
                Title=serializer.validated_data['Title'],
                Year=serializer.validated_data['Year'],
                Poster=serializer.validated_data['Poster']
                )
            data = {}
            if movie[1] == True:
                data['status'] = True
                data['response'] = "Movie Added!"
            else:
                data['status'] = False
                data['response'] = 'Movie already added!'
            return Response(data)
        else:
            return Response({'msg':'Provide valid data'},status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def RemoveFromLikedListView(request):
    if request.method == 'POST':
        user = request.user
        serializer = MovieDataSerializer(data=request.data)
        if serializer.is_valid():

            movie = Movie.objects.get(
                user=user,
                imdbID=serializer.validated_data['imdbID'],
                Title=serializer.validated_data['Title'],
                Year=serializer.validated_data['Year'],
                Poster=serializer.validated_data['Poster']
                )
            movie.delete()
            data = {'response':'Movie removed!'}
            return Response(data)
        else:
            return Response({'msg':'Provide valid data'},status=status.HTTP_406_NOT_ACCEPTABLE)


# Returns the list of liked movies by the user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetLikedListView(request):
    if request.method == 'GET':
        user = request.user
        print(user)
        data = {}
        if Movie.objects.filter(user=user).count() == 0:
            data['status'] = False
        else:
            movieList = Movie.objects.filter(user=user)
            serializer = MovieDataSerializer(movieList,many=True)
            data['status'] = True
            data['movieList'] = serializer.data
        return Response(data)
        


# Checks whether a movie already liked by the user or not
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def MovieLikedOrNotView(request):
    if request.method == 'POST':
        user = request.user
        imdbID = request.data['imdbID']
        data = {}
        if Movie.objects.filter(user=user,imdbID=imdbID).exists():
            data['status'] = True
        else :
            data['status'] = False
        return Response(data)
    else:
        print("BLAH")


#Movieboard -> Returns popular movies among users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MovieboardView(request):
    if request.method == 'GET':
        movieList = Movie.objects.values('imdbID','Title','Year','Poster').annotate(num_liked=Count('imdbID')).order_by('-num_liked')
        data = {}
        if len(movieList) == 0:
            data['status'] = False
        else:
            data['status'] = True
            data['movieList'] = movieList[:10]
        return Response(data)
