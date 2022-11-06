from pyexpat import model
from tabnanny import verbose
from django.db import models
from numpy import blackman

# user model
class User(models.Model):
    user_id = models.CharField(max_length=64, unique=True, verbose_name='보호자 아이디')
    user_pw = models.CharField(max_length=128, verbose_name='보호자 비밀번호')
    user_name = models.CharField(max_length=16, verbose_name='보호자 이름')
    user_gender = models.CharField(max_length=8, verbose_name='보호자 성별')
    user_resident_number = models.CharField(max_length=16, unique=True, verbose_name='보호자 주민등록번호')
    user_phone_number = models.CharField(max_length=16, unique=True, verbose_name='보호자 연락처')
    user_emergency_number = models.CharField(max_length=16, verbose_name='보호자 비상연락처')
    user_email = models.EmailField(max_length=128, unique=True, verbose_name='보호자 이메일')
    user_address = models.CharField(max_length=128, verbose_name='보호자 주소')
    user_protected_name = models.CharField(max_length=16, verbose_name='보호대상 이름', null=True)
    user_register_dttm = models.DateTimeField(auto_now_add=True, verbose_name='보호자 계정 생성시간')

    # name
    def __str__(self):
        return self.user_id

    # meta data
    class Meta:
        db_table = 'user'
        verbose_name = '보호자'
        verbose_name_plural = '보호자'

#######################################################################################################
# 구분선 상단 내용은 전부 삭제될 예정
#######################################################################################################

from tabnanny import verbose
from django.db import models

# 유저 정보
class User(models.Model):
    usernum = models.SmallAutoField(db_column='UserNum', primary_key=True)  # Field name made lowercase.
    id = models.CharField(db_column='ID', unique=True, max_length=128, blank=True, null=True)  # Field name made lowercase.
    pass_field = models.CharField(db_column='PASS', max_length=128, blank=True, null=True)  # Field name made lowercase. Field renamed because it was a Python reserved word.
    username = models.CharField(db_column='UserName', max_length=32, blank=True, null=True)  # Field name made lowercase.
    userphonenum = models.CharField(db_column='UserPhoneNUM', max_length=32, blank=True, null=True)  # Field name made lowercase.
    e_mail = models.CharField(db_column='E_Mail', unique=True, max_length=256, blank=True, null=True)  # Field name made lowercase.
    userage = models.IntegerField(db_column='UserAge', blank=True, null=True)  # Field name made lowercase.
    commonusertype = models.IntegerField(db_column='CommonUserType', blank=True, null=True)  # Field name made lowercase.
    adminusertype = models.IntegerField(db_column='AdminUserType', blank=True, null=True)  # Field name made lowercase.

    # meta data
    class Meta:
        managed = False
        db_table = 'User'
        verbose_name = 'User'
        verbose_name_plural = 'User'

    # naming data
    def __str__(self):
        return self.usernum

# 위치 추적 대상자 정보
class Target(models.Model):
    targetnum = models.SmallAutoField(db_column='TargetNum', primary_key=True)  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='UserNum')  # Field name made lowercase.
    targetname = models.CharField(db_column='TargetName', max_length=32, blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='Gender', max_length=1, blank=True, null=True)  # Field name made lowercase.
    # image = models.TextField(db_column='Image', blank=True, null=True)  # Field name made lowercase.
    birthdate = models.DateTimeField(db_column='BirthDate', blank=True, null=True)  # Field name made lowercase.
    targetage = models.IntegerField(db_column='TargetAge', blank=True, null=True)  # Field name made lowercase.
    missingornot = models.IntegerField(db_column='MissingOrNot', blank=True, null=True)  # Field name made lowercase.
    urgentnum = models.CharField(db_column='UrgentNum', max_length=32, blank=True, null=True)  # Field name made lowercase.

    # meta data
    class Meta:
        managed = False
        db_table = 'Target'
        unique_together = (('targetnum', 'usernum'),)
        verbose_name = 'Target'
        verbose_name_plural = 'Target'

    # naming data
    def __str__(self):
        return self.targetnum

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

# 위치 추적 장치 정보
class Device(models.Model):
    devicename = models.CharField(db_column='DeviceName', primary_key=True, max_length=64)  # Field name made lowercase.
    targetnum = models.ForeignKey('Target', models.DO_NOTHING, db_column='TargetNum')  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='UserNum')  # Field name made lowercase.

    # meta data
    class Meta:
        managed = False
        db_table = 'Device'
        unique_together = (('devicename', 'targetnum', 'usernum'),)
        verbose_name = 'Device'
        verbose_name_plural = 'Device'

    # naming data
    def __str__(self):
        return self.devicename