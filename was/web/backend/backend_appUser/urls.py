from django.urls import path
from .views import Login, Register

# http://localhost/user
app_name = 'backend_appUser'
urlpatterns = [
    # 테스트 로그인 페이지
    path('login/', Login.as_view()),

    # 테스트 회원가입 페이지
    path('register/', Register.as_view()),
]