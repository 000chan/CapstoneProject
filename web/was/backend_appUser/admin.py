from django.contrib import admin
from .models import User, Target, MissingProtector, Device

# django admin page에 등록될 model들

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'usernum',
        'id',
        'pass_field',
        'username',
        'userphonenum',
        'e_mail',
        'userage',
        'commonusertype',
        'adminusertype'
    )

@admin.register(Target)
class TargetAdmin(Target):
    list_display = (
        'targetnum',
        'usernum',
        'targetname',
        'gender',
        'image',    # null
        'birthdate',
        'targetage',
        'missingornot',
        'urgentnum'
    )

@admin.register(MissingProtector)
class MissingProtectorAdmin(MissingProtector):
    list_display = (
        'protectornum',
        'protectorname',
        'protectorphonenum'
    )

@admin.register(Device)
class DeviceAdmin(Device):
    list_display = (
        'devicename',
        'targetnum',
        'usernum'
    )