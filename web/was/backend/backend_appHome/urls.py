from django.contrib import admin
from django.urls import path
from . import views
from django.views.generic import RedirectView

# http://localhost/home
app_name = 'backend_appHome'
urlpatterns = [
    path('', views.home, name='homeHome'),
]