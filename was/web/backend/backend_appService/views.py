from django.shortcuts import render
# from backend_appUser.models import User
# from user.serializer import userSerializer
# from .models import apData
# from .serializer import apSerializer
from datetime import datetime

# servicePage maps
def maps(request):
    if request.method == 'GET':
         
        context = {}

        # get and send user_id
        context['login_session'] = request.session['login_session']

        # send target name (tmp)
        currentUser = User.objects.get(user_id=context['login_session'])
        target = currentUser.user_protected_name
        context['user_protected_name'] = target
        context['target_longitude'] = '127.126228'
        context['target_latitude'] = '37.320232'

        # send target position
        # r = redis.StrictRedis(host="133.186.250.221", port=6379, db=0)
        # target_longitude = r.hget(target, "longitude")
        # str_longitude = target_longitude[0]
        # target_latitude = r.hget(target, "latitude")
        # str_latitude = target_latitude[0]
        # target_macaddress = r.hget(target, "macadr")
        # str_macaddress = target_macaddress[0]       
        # # send target longitude
        # context['target_longitude'] = str_longitude.decode()
        # # send target latitude
        # context['target_latitude'] = str_latitude.decode()
        # # send target_macaddress
        # context['target_macaddress'] = str_macaddress.decode()

        now = datetime.now()
        context['now'] = now

        return render(request, 'maps.html', context)

# servicePage mypage
# def mypage(request):
#     if request.method == 'GET':
#         context = {}

#         # get and send user_id
#         context['login_session'] = request.session['login_session']

#         currentUser = User.objects.get(user_id=context['login_session'])

#         currentUser_name = currentUser.user_name
#         context['user_name'] = currentUser_name
#         currentUser_phone_number = currentUser.user_phone_number
#         context['user_phone_number'] = currentUser_phone_number
#         currentUser_emergency_number = currentUser.user_emergency_number
#         context['user_emergency_number'] = currentUser_emergency_number
#         currentUser_email = currentUser.user_email
#         context['user_email'] = currentUser_email
#         currentUser_address = currentUser.user_address
#         context['user_address'] = currentUser_address
#         currentUser_protected_name = currentUser.user_protected_name
#         context['user_protected_name'] = currentUser_protected_name

        # currentUser_q = User.objects.all()
        # currentUser_s = userSerializer

    return render(request, 'mypage.html', context)


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from backend_appUser.models import User, Target
from .models import MissingAnnouncement, MissingInfo, MissingProtector, Pastpath, Search

from backend_appUser.serializer import UserSerializer, TargetSerializer
from .serializers import MissingAnnouncementSerializer, MissingInfoSerializer, MissingProtector, PastpathSerializer, SearchSerializer

class Map(APIView):
    def get(self, request):
        # react로 전송할 json 객체
        resData = {}

        # request data로 해당 user model 불러오기
        user_id = request.query_params.get("params")
        userModel = User.objects.get(id=user_id)

        key = userModel.usernum

        pathModel = Pastpath.objects.get(usernum=key)

        try:
            resData = []
            resData.append({
                "latitude" : pathModel.latitude,
                "longitude" : pathModel.longitude,
                "signaledtime" : pathModel.signaledtime,
            })
        except:
            print("===ERROR: User 모델을 불러오는데 실패했습니다.===")
        return Response(resData)


class mapUser(APIView):
    def get(self, request):
        # react로 전송할 json 객체
        resData = {}

        # request data로 해당 user model 불러오기
        user_id = request.query_params.get("params")
        userModel = User.objects.get(id=user_id)

        try:
            resData = []
            resData.append({
                "id" : userModel.id,
                "username" : userModel.username,
                "userphonenum" : userModel.userphonenum,
                "e_mail" : userModel.e_mail,
                "userage" : userModel.userage,
            })
        except:
            print("===ERROR: User 모델을 불러오는데 실패했습니다.===")
        
        return Response(resData)