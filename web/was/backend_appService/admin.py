from django.contrib import admin
from .models import MissingAnnouncement, MissingInfo, Pastpath, Search

# django admin page에 등록될 model들

@admin.register(MissingAnnouncement)
class MissingAnnouncementAdmin(MissingAnnouncement):
    list_display = (
        'announcementnum',
        'missingname',
        'missingimage',
        'enroll_time',
        'protectornum',
        'infonum'
    )

@admin.register(MissingInfo)
class MissingInfoAdmin(MissingInfo):
    list_display = (
        'infonum',
        'disappearancetime',
        'disappearancearea'
    )

@admin.register(Pastpath)
class Pastpath(Pastpath):
    list_display = (
        'targetnum',
        'usernum',
        'devicename',
        'signaledtime',
        'latitude',
        'longitude'
    )

@admin.register(Search)
class Search(Search):
    list_display = (
        'targetnum',
        'usernum'
    )