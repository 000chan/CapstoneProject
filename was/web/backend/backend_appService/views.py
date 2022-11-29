from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from backend_appUser.models import User, Target
from .models import MissingAnnouncement, MissingInfo, MissingProtector, Pastpath, Search
from backend_appUser.serializer import UserSerializer, TargetSerializer
from .serializers import MissingAnnouncementSerializer, MissingInfoSerializer, MissingProtector, PastpathSerializer, SearchSerializer

class Map(APIView):
    def get(self, request):
        # request data로 해당 user model 불러오기
        user_id = request.query_params.get("params")
        key = User.objects.get(id=user_id).usernum

        try:
            pathModel = Pastpath.objects.get(usernum=key)
            resData = []
            resData.append({
                "latitude" : pathModel.latitude,
                "longitude" : pathModel.longitude,
                "signaledtime" : pathModel.signaledtime,
            })
            return Response(resData, status=status.HTTP_200_OK)
        except:
            print("===ERROR: 연결된 타겟이 없습니다.")
            return Response(
                { "message" : "연결된 타겟이 없습니다. 마이페이지에서 확인해주세요." },
                status=status.HTTP_400_BAD_REQUEST
            )


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