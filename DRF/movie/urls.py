from django.urls import path

from . import views

app_name = 'movie'

urlpatterns = [
    path('register/',views.UserRegistrationView,name='register'),
    path('login/',views.UserLoginView,name='login'),

    path('addtolikedlist/',views.AddToLikedListView,name='addtolikedlist'),
    path('removefromlikedlist/',views.RemoveFromLikedListView,name='removefromlikedlist'),   
    path('getlikedlist/',views.GetLikedListView,name='getlikedlist'),
    path('movielikedornot/',views.MovieLikedOrNotView,name='movielikedornot'),

    path('movieboard/',views.MovieboardView,name='movieboard'),
]