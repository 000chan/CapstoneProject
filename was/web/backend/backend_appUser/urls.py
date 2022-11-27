from django.urls import path
from .views import Login, Register, Mypage

# http://localhost/user
app_name = 'backend_appUser'
urlpatterns = [
    # 로그인 API
    path('login/', Login.as_view()),

    # 회원가입 API
    path('register/', Register.as_view()),

    # 마이페이지 API
    path('getmypage/', Mypage.as_view()),
]