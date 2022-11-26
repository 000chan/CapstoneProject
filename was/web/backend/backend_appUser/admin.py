from django.contrib import admin
from .models import User, Device, Target, testLogin

admin.site.register(testLogin)
admin.site.register(User)
admin.site.register(Device)
admin.site.register(Target)

# django admin page에 등록될 model들

# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = (
#         'usernum',
#         'id',
#         'pass_field',
#         'username',
#         'userphonenum',
#         'e_mail',
#         'userage',
#         'commonusertype',
#         'adminusertype'
#     )

# @admin.register(Target)
# class TargetAdmin(admin.ModelAdmin):
#     list_display = (
#         'targetnum',
#         'usernum',
#         'targetname',
#         'gender',
#         'image',
#         'birthdate',
#         'targetage',
#         'missingornot',
#         'urgentnum'
#     )

# @admin.register(Device)
# class DeviceAdmin(admin.ModelAdmin):
#     list_display = (
#         'devicename',
#         'targetnum',
#         'usernum'
#     )
