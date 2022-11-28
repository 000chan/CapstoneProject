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