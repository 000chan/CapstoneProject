from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

# http://127.0.0.1:8000/
urlpatterns = [
    # adminPage
    path('admin/', admin.site.urls),
    
    # homePage
    path('home/', include('backend_appHome.urls')),

    # redirect to homePage
    path('', RedirectView.as_view(url="/home/", permanent=True)),

    # loginPage
    path('user/', include('backend_appUser.urls')),

    # servicePage
    path('service/', include('backend_appService.urls')),
]