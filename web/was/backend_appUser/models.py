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