from django.contrib import admin
from django.urls import path, include
from . import views
from .views import testLogin

# http://localhost/user
app_name = 'backend_appUser'
urlpatterns = [
    path('register/', views.register, name='userRegister'),
#     path('login/', views.login, name='userLogin'),
    path('logout/', views.logout, name='userLogout'),

    #     path('register/', Register.as_view()),            > (가입 페이지)
    #     path('login/', Login.as_view()),                  > (로그인 페이지)
    #     path('logout/', Logout.as_view()),                > (로그아웃 페이지)

    path('login/', testLogin.as_view()),
]