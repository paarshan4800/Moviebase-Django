from django.shortcuts import redirect
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.response import Response

from .models import *

def authenticated_user(view_func):
    def wrapper_func(request,*args,**kwargs):
        if request.user.is_authenticated:
            return redirect('/home')
        else:
            return view_func(request,*args,**kwargs)
    return wrapper_func


def additional_info_done(view_func):
    def wrapper_func(request,*args,**kwargs):
        print(request.user)
        if User.objects.get(username=request.user).userdetail.flag == False:
            return redirect('/register-info')
        else:
            return view_func(request,*args,**kwargs)
    return wrapper_func

def user_or_not(view_func):
    def wrapper_func(request,*args,**kwargs):
        if User.objects.get(username=request.user.username).exists():
            return view_func(request,*args,**kwargs)
        else:
            return Response({'msg':'Not Authorized'},status=status.HTTP_401_UNAUTHORIZED)
        return wrapper_func