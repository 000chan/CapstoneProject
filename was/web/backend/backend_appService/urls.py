from django.contrib import admin
from django.urls import path
from . import views

# http://localhost/service
app_name = 'backend_appService'
urlpatterns = [
    path('', views.home, name='serviceHome'),
    path('maps/', views.maps, name='serviceMaps'),
    path('mypage/', views.mypage, name='serviceMypage'),
    path('chan/', views.chan, name='serviceChan'),
    path('hoon/', views.hoon, name='serviceHoon'),
    path('project/', views.project, name='serviceProject'),
]