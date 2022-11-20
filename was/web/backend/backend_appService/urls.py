from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from .views import Test, Map

# http://localhost/service
app_name = 'backend_appService'
urlpatterns = [
    path('', views.home, name='serviceHome'),
    path('chan/', views.chan, name='serviceChan'),
    path('hoon/', views.hoon, name='serviceHoon'),
    path('project/', views.project, name='serviceProject'),

    path('mypage/', Test.as_view()),
    path('map/', Map.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)