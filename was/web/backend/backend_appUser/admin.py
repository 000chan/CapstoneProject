from django.contrib import admin
from .models import User, Device, Target

# django admin page에 등록될 model들

admin.site.register(User)
admin.site.register(Device)
admin.site.register(Target)