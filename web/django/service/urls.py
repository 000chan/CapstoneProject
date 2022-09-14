from django.contrib import admin
from django.urls import path
from . import views

# http://localhost/service
app_name = 'service'
urlpatterns = [
    path('', views.home, name='home'),
    path('maps/', views.maps, name='maps'),
    path('mypage/', views.mypage, name='mypage'),
    path('chan/', views.chan, name='chan'),
    path('hoon/', views.hoon, name='hoon'),
    path('project/', views.project, name='project'),
]