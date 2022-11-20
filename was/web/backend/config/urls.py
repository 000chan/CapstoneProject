from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

# http://127.0.0.1:8000/
urlpatterns = [
    # homePage
    path('', RedirectView.as_view(url='/home/', permanent=True)),
    path('home/', include('backend_appHome.urls')),

    # loginPage
    path('user/', include('backend_appUser.urls')),

    # servicePage
    path('service/', include('backend_appService.urls')),

    # adminPage
    path('admin/', admin.site.urls),
]