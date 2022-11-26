from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .serializer import TestSerializer, TestRegisterSerializer, UserSerializer
from .models import testLogin, testRegister, User
import datetime

class testLogin(APIView):
    def get(self, request):
        logindata = testLogin.objects.all()
        serializer = TestSerializer(logindata, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TestSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print(serializer.data)
            print(type(serializer.data))
            return Response(request.data)
        print('fail')
        return Response(request.data)

class testRegister(APIView):
    def post(self, request):

        print(request.data)
        print(datetime.date.today().year)

        # pass_field, pass_field_check 동일한지 검사
        if request.data["pass_field"]!=request.data["pass_field_check"]:
            print("ERROR: 'pass_field' and 'pass_field_check' is different")
            return Response(
                { "message" : "비밀번호가 일치하지 않습니다. 동일한 비밀번호를 입력해주세요." },
                status=status.HTTP_400_BAD_REQUEST
            )

        # userage 계산
        elif request.data["birthdate"] is not None:
            userage = datetime.date.today().year - int(request.data["birthdate"].split("T")[0].split("-")[0]) + 1
            request.data["userage"] = str(userage)
            print(request.data)

        # serializer 지정 
        serializer = UserSerializer(data=request.data)

        # request.data 유효성 검사
        if serializer.is_valid():
            # 회원 데이터 저장
            user = serializer.save()
            print('success')
            return Response(status=status.HTTP_200_OK)

        print('fail')
        return Response(request.data)