from django.contrib import admin
from django.urls import path
from .views import Map, mapUser

# http://localhost/service
app_name = 'backend_appService'
urlpatterns = [
    # 지도 API
    path('map/', Map.as_view()),
    path('user/', mapUser.as_view()),
]