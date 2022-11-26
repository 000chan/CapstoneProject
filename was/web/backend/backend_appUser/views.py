from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import TestSerializer, UserSerializer
from .models import testLogin, User
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

class Register(APIView):
    def post(self, request):
        # pass_field, pass_field_check 동일한지 검사
        if request.data["pass_field"] != request.data["pass_field_check"]:
            print("===ERROR: 'pass_field' 데이터와 'pass_field_check' 데이터가 일치하지 않습니다.===")
            return Response(
                { "message" : "비밀번호가 일치하지 않습니다. 동일한 비밀번호를 입력해주세요." },
                status=status.HTTP_400_BAD_REQUEST
            )
        # e_mail 유효성 체크
        elif request.data["e_mail"].find("@") == -1:
            print("===ERROR: 'e_mail' 데이터가 올바르지 않습니다.===")
            return Response(
                { "message" : "이메일 주소가 올바르지 않습니다. 다시 입력해주세요." },
                status=status.HTTP_400_BAD_REQUEST
            )
        # userage 계산
        elif request.data["birthdate"] is not None:
            userage = datetime.date.today().year - int(request.data["birthdate"].split("T")[0].split("-")[0]) + 1
            if userage <= 0:
                print("===ERROR: 생년월일 데이터가 올바르지 않습니다.===")
                return Response(
                    { "message" : "생년월일이 올바르지 않습니다. 다시 입력해주세요." },
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                request.data["userage"] = str(userage)

        # serializer 지정 
        serializer = UserSerializer(data=request.data)

        # request.data 유효성 검사
        if serializer.is_valid():
            user = serializer.save()
            print('===register success===')
            return Response(status=status.HTTP_200_OK)

        # request.data 유효성 검사 예외처리
        if serializer.errors is not None:
            message = []
            for key in serializer.errors:
                if key=="id":
                    message.append("이미 존재하는 아이디입니다.")
                    print("===ERROR: 이미 존재하는 아이디 데이터입니다.===")
                elif key=="userphonenum":
                    message.append("이미 존재하는 전화번호입니다.")
                    print("===ERROR: 이미 존재하는 전화번호 데이터입니다.===")
                elif key=="e_mail":
                    message.append("이미 존재하는 이메일입니다.")
                    print("===ERROR: 이미 존재하는 이메일 데이터입니다.===")

        print("===register fail===")
        return Response(message, status=status.HTTP_400_BAD_REQUEST)