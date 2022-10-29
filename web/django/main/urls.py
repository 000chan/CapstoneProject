from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

# http://localhost/
urlpatterns = [
    # adminPage
    path('admin/', admin.site.urls),
    
    # homePage
    path('home/', include('home.urls')),

    # redirect to homePage
    path('', RedirectView.as_view(url="/home/", permanent=True)),

    # loginPage
    path('user/', include('user.urls')),

    # servicePage
    path('service/', include('service.urls')),
]
