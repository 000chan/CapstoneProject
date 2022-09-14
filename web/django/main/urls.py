from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

# http://localhost/
urlpatterns = [
    # 관리자 페이지
    path('admin/', admin.site.urls),
    
    # homePage
    path('home/', include('home.urls')),

    # http://***.*.*.*:8000/으로 접속 시, /home/으로 강제 redirect
    path('', RedirectView.as_view(url="/home/", permanent=True)),

    # loginPage
    path('user/', include('user.urls')),

    # servicePage
    path('service/', include('service.urls')),


    # serviceBoardPage

    # serviceMapsPage

]
