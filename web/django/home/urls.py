from django.contrib import admin
from django.urls import path, include
from . import views
from django.views.generic import RedirectView

# http://localhost/home
app_name = 'home'
urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]