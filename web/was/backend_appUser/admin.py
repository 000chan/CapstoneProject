from django.contrib import admin
from .models import User

# user model
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'user_id',
        'user_pw',
        'user_name',
        'user_gender',
        'user_resident_number',
        'user_phone_number',
        'user_emergency_number',
        'user_email',
        'user_address',
        'user_register_dttm',
        'user_protected_name',
    )