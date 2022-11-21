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

    path('map/', Map.as_view()),
    path('mypage/', Test.as_view()),

#     path('map/', Map.as_view()),          > (지도 페이지)
#     path('mypage/', Test.as_view()),      > (마이 페이지)
#     path('about/', Map.as_view()),        > 딱히 불러오는 데이터 없으니 프론트단에서 보여주기만 하고 굳이 만들 필요 없을수도 (서비스 소개페이지)
#     path('project/', Map.as_view()),      > 딱히 불러오는 데이터 없으니 프론트단에서 보여주기만 하고 굳이 만들 필요 없을수도 (멤버 소개 페이지)
#     path('tech/', Map.as_view()),         > 딱히 불러오는 데이터 없으니 프론트단에서 보여주기만 하고 굳이 만들 필요 없을수도 (기술 소개 페이지)
]

# URL로 하여금 특정 포맷을 참조할 수 있게 만듬 (필수 X)
urlpatterns = format_suffix_patterns(urlpatterns)