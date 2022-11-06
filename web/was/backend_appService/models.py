from tabnanny import verbose
from django.db import models
from backend_appUser.models import Device, Target

# 실종자 정보
class MissingAnnouncement(models.Model):
    announcementnum = models.SmallAutoField(db_column='AnnouncementNum', primary_key=True)  # Field name made lowercase.
    missingname = models.CharField(db_column='MissingName', max_length=32, blank=True, null=True)  # Field name made lowercase.
    missingimage = models.TextField(db_column='MissingImage', blank=True, null=True)  # Field name made lowercase.
    enroll_time = models.DateTimeField(db_column='Enroll_Time')  # Field name made lowercase.
    protectornum = models.ForeignKey('MissingProtector', models.DO_NOTHING, db_column='ProtectorNum')  # Field name made lowercase.
    infonum = models.ForeignKey('MissingInfo', models.DO_NOTHING, db_column='InfoNum')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Missing_Announcement'
        verbose_name = 'Missing_Announcement'
        verbose_name_plural = 'Missing_Announcement'

    # naming data
    def __str__(self):
        return self.announcementnum

# 실종 신고 정보
class MissingInfo(models.Model):
    infonum = models.SmallAutoField(db_column='InfoNum', primary_key=True)  # Field name made lowercase.
    disappearancetime = models.DateTimeField(db_column='DisappearanceTime')  # Field name made lowercase.
    disappearancearea = models.TextField(db_column='DisappearanceArea', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Missing_Info'
        verbose_name = 'Missing_Info'
        verbose_name_plural = 'Missing_Info'

    # naming data
    def __str__(self):
        return self.infonum

# 보호자 정보
class MissingProtector(models.Model):
    protectornum = models.SmallAutoField(db_column='ProtectorNum', primary_key=True)  # Field name made lowercase.
    protectorname = models.CharField(db_column='ProtectorName', max_length=32, blank=True, null=True)  # Field name made lowercase.
    protectorphonenum = models.CharField(db_column='ProtectorPhoneNum', max_length=32, blank=True, null=True)  # Field name made lowercase.

    # meta data
    class Meta:
        managed = False
        db_table = 'Missing_Protector'
        verbose_name = 'Missing_Protector'
        verbose_name_plural = 'Missing_Protector'

    # naming data
    def __str__(self):
        return self.protectornum

# 실종자 이전 경로
class Pastpath(models.Model):
    targetnum = models.ForeignKey('backend_appUser.Target', models.DO_NOTHING, db_column='TargetNum')  # Field name made lowercase.
    usernum = models.ForeignKey('backend_appUser.User', models.DO_NOTHING, db_column='UserNum')  # Field name made lowercase.
    devicename = models.OneToOneField(Device, models.DO_NOTHING, db_column='DeviceName', primary_key=True)  # Field name made lowercase.
    signaledtime = models.DateTimeField(db_column='SignaledTime')  # Field name made lowercase.
    latitude = models.FloatField(db_column='Latitude', blank=True, null=True)  # Field name made lowercase.
    longitude = models.FloatField(db_column='Longitude', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PastPath'
        unique_together = (('devicename', 'targetnum', 'usernum', 'signaledtime'),)
        verbose_name = 'PastPath'
        verbose_name_plural = 'PastPath'

    # naming data
    def __str__(self):
        return self.devicename

# 검색 정보
class Search(models.Model):
    targetnum = models.OneToOneField('backend_appUser.Target', models.DO_NOTHING, db_column='TargetNum', primary_key=True)  # Field name made lowercase.
    usernum = models.ForeignKey('backend_appUser.User', models.DO_NOTHING, db_column='UserNum')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Search'
        unique_together = (('targetnum', 'usernum'),)
        verbose_name = 'Search'
        verbose_name_plural = 'Search'

    # naming data
    def __str__(self):
        return self.targetnum
