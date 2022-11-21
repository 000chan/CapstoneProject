from django.contrib import admin
from django.urls import path
from . import views
from django.views.generic import RedirectView

# http://localhost/home
app_name = 'backend_appHome'
urlpatterns = [
    path('', views.home, name='homeHome'),

#     path('', Home.as_view()),          > 딱히 불러오는 데이터 없으니 프론트단에서 보여주기만 하고 굳이 만들 필요 없을수도 (메인 페이지)
]