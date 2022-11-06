from django.contrib import admin
from .models import MissingAnnouncement, MissingInfo, MissingProtector, Pastpath, Search

# django admin page에 등록될 model들

@admin.register(MissingAnnouncement)
class MissingAnnouncementAdmin(admin.ModelAdmin):
    list_display = (
        'announcementnum',
        'missingname',
        'missingimage',
        'enroll_time',
        'protectornum',
        'infonum'
    )

@admin.register(MissingInfo)
class MissingInfoAdmin(admin.ModelAdmin):
    list_display = (
        'infonum',
        'disappearancetime',
        'disappearancearea'
    )

@admin.register(MissingProtector)
class MissingProtectorAdmin(admin.ModelAdmin):
    list_display = (
        'protectornum',
        'protectorname',
        'protectorphonenum'
    )

@admin.register(Pastpath)
class Pastpath(admin.ModelAdmin):
    list_display = (
        'targetnum',
        'usernum',
        'devicename',
        'signaledtime',
        'latitude',
        'longitude'
    )

@admin.register(Search)
class Search(admin.ModelAdmin):
    list_display = (
        'targetnum',
        'usernum'
    )