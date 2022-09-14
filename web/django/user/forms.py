from django import forms
from argon2 import PasswordHasher, exceptions
from pkg_resources import require
from .models import User

# register form
class RegisterForm(forms.ModelForm):

    user_id = forms.CharField(
        label='아이디',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-id',
                'placeholder' : '아이디'
            }
        ),
        error_messages={
        'required' : '아이디를 입력해주세요.',
        'unique' : '중복된 아이디입니다.'}
    )


    user_pw = forms.CharField(
        label='비밀번호',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'class' : 'user-pw',
                'placeholder' : '비밀번호'
            }
        ),
        error_messages={'required' : '비밀번호를 입력해주세요.'}
    )


    user_pw_confirm = forms.CharField(
        label='비밀번호 확인',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'class' : 'user-pw-confirm',
                'placeholder' : '비밀번호 확인'
            }
        ),
        error_messages={'required' : '비밀번호가 일치하지 않습니다.'}
    )


    user_name = forms.CharField(
        label='보호자 이름',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-name',
                'placeholder' : '보호자 이름'
            }
        ),
        error_messages={
            'required' : '이름을 입력해주세요.',
            }
    )


    user_gender = forms.CharField(
        label='보호자 성별',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-gender',
                'placeholder' : '보호자 성별'
            }
        ),
        error_messages={
            'required' : '성별을 입력해주세요.',
        }
    )


    user_resident_number = forms.CharField(
        label='보호자 주민등록번호',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-resident-number',
                'placeholder' : '보호자 주민등록번호'
            }
        ),
        error_messages={
            'required' : '주민등록번호를 입력해주세요',
            'unique' : '이미 등록된 주민등록번호입니다.'
        }
    )


    user_phone_number = forms.CharField(
        label='보호자 연락처',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-number',
                'placeholder' : '보호자 연락처'
            }
        ),
        error_messages={
            'required' : '연락처를 입력해주세요',
            'unique' : '이미 등록된 연락처입니다.'
        }
    )


    user_emergency_number = forms.CharField(
        label='보호자 비상연락처',
        required=False,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-ermergency-number',
                'placeholder' : '[권장] 비상연락처. 미기입시 발생하는 불이익은 책임지지 않습니다.'
            }
        ),
    )


    user_email = forms.EmailField(
        label='보호자 이메일',
        required=True,
        widget=forms.EmailInput(
            attrs={
                'class' : 'user-email',
                'placeholder' : '보호자 이메일'
            }
        ),
        error_messages={
            'required' : '이메일을 입력해주세요.',
            'unique' : '중복된 이메일입니다.'
            }
    )


    user_address = forms.CharField(
        label='보호자 주소',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-address',
                'placeholder' : '보호자 주소'
            }
        ),
        error_messages={
            'required' : '주소를 입력해주세요.'
        }
    )


    user_protected_name = forms.CharField(
        label='보호대상 이름',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-protected-name',
                'placeholder' : '보호대상 이름'
            }
        ),
        error_messages={
            'required' : '보호대상 이름을 입력해주세요.'
        }
    )


    field_order = [
        'user_id',
        'user_pw',
        'user_pw_confirm',
        'user_name',
        'user_gender',
        'user_resident_number',
        'user_phone_number',
        'user_emergency_number',
        'user_email',
        'user_address',
        'user_protected_name',
    ]


    class Meta:
        model = User
        fields = [
            'user_id',
            'user_pw',
            'user_name',
            'user_gender',
            'user_resident_number',
            'user_phone_number',
            'user_emergency_number',
            'user_email',
            'user_address',
            'user_protected_name', 
        ]


    def clean(self):

        cleaned_data = super().clean()

        user_id = cleaned_data.get('user_id', '')
        user_pw = cleaned_data.get('user_pw', '')
        user_pw_confirm = cleaned_data.get('user_pw_confirm', '')
        user_name = cleaned_data.get('user_name', '')
        user_gender = cleaned_data.get('user_gender', '')
        user_resident_number = cleaned_data.get('user_resident_number', '')
        user_phone_number = cleaned_data.get('user_phone_number', '')
        user_emergency_number = cleaned_data.get('user_emergency_number', '')
        user_email = cleaned_data.get('user_email', '')
        user_address = cleaned_data.get('user_address', '')
        user_protected_name = cleaned_data.get('user_protected_name', '')

        if user_pw != user_pw_confirm:
            return self.add_error('user_pw_confirm', '비밀번호가 다릅니다.')
        elif not(4 <= len(user_id) <= 16):
            return self.add_error('user_id', '아이디는 4~16자리로 입력해주세요.')
        elif 8 > len(user_pw):
            return self.add_error('user_pw', '비밀번호는 8자 이상으로 적어주세요.')
        else:
            self.user_id = user_id
            self.user_pw = PasswordHasher().hash(user_pw)
            self.user_pw_confirm = user_pw_confirm
            self.user_name = user_name
            self.user_gender = user_gender
            self.user_resident_number = user_resident_number
            self.user_phone_number = user_phone_number
            self.user_emergency_number = user_emergency_number
            self.user_email = user_email
            self.user_address = user_address
            self.user_protected_name = user_protected_name

# login form
class LoginForm(forms.Form):


    user_id = forms.CharField(
        max_length=32,
        label='아이디',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'user-id',
                'placeholder' : '아이디'
            }
        ),
        error_messages={'required' : '아이디를 입력해주세요.'}
    )

    user_pw = forms.CharField(
        max_length=128,
        label='비밀번호',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'class' : 'user-pw',
                'placeholder' : '비밀번호'
            }
        ),
        error_messages={'required' : '비밀번호를 입력해주세요.'}
    )

    field_order = [
        'user_id',
        'user_pw'
    ]

    def clean(self):
        cleaned_data = super().clean()

        user_id = cleaned_data.get('user_id', '')
        user_pw = cleaned_data.get('user_pw', '')

        if user_id == '':
            return self.add_error('user_id', '아이디를 다시 입력해주세요.')

        elif user_pw == '':
            return self.add_error('user_pw', '비밀번호를 다시 입력해주세요.')

        else:
            try:
                user = User.objects.get(user_id=user_id)
            except User.DoesNotExist:
                return self.add_error('user_id', '아이디가 존재하지 않습니다.')

            try:
                PasswordHasher().verify(user.user_pw, user_pw)
            except exceptions.VerifyMismatchError:
                return self.add_error('user_pw', '비밀번호가 다릅니다.')

            self.login_session = user.user_id
