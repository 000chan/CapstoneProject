from django.contrib import admin
from django.urls import path, include
from . import views

# http://localhost/user
app_name = 'backend_appUser'
urlpatterns = [
    path('register/', views.register, name='userRegister'),
    path('login/', views.login, name='userLogin'),
    path('logout/', views.logout, name='userLogout'),
]