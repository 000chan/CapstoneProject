from django.contrib import admin
from django.urls import path, include
from . import views
from .views import testLogin, Register

# http://localhost/user
app_name = 'backend_appUser'
urlpatterns = [
    # 테스트 로그인 페이지
    path('login/', testLogin.as_view()),

    # 테스트 회원가입 페이지
    path('register/', Register.as_view()),
]