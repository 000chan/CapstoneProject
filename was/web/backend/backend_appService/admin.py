from django.contrib import admin
from .models import MissingAnnouncement, MissingInfo, MissingProtector, Pastpath, Search

# django admin page에 등록될 model들

admin.site.register(MissingAnnouncement)
admin.site.register(MissingInfo)
admin.site.register(MissingProtector)
admin.site.register(Pastpath)
admin.site.register(Search )