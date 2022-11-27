from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserSerializer
from .models import User, Target
import datetime
from argon2 import PasswordHasher

class Login(APIView):
    def post(self, request):
        # request data
        id = request.data["id"]
        password = request.data["pass_field"]

        # request data와 일치하는 회원정보가 있는지 검사
        try:
            user = User.objects.get(id=id)
        except:
            print("===ERROR: 아이디 데이터가 올바르지 않습니다.===")
            return Response(
                { "message" : "아이디가 존재하지 않습니다." },
                status=status.HTTP_400_BAD_REQUEST
            )

        # 회원이 맞는 경우, 비밀번호 검사
        try:
            PasswordHasher().verify(user.pass_field, password=password)
            print("===SUCCESS: 로그인 성공!===")
            return Response(user.id, status=status.HTTP_200_OK)
        except:
            print("===ERROR: 비밀번호 데이터가 올바르지 않습니다.===")
            return Response(
            { "message" : "입력된 비밀번호가 올바르지 않습니다. 다시 입력해주세요" },
            status=status.HTTP_400_BAD_REQUEST
            )
        

class Register(APIView):
    def post(self, request):
        # pass_field, pass_field_check 동일한지 검사
        if request.data["pass_field"] != request.data["pass_field_check"]:
            print("===ERROR: 'pass_field' 데이터와 'pass_field_check' 데이터가 일치하지 않습니다.===")
            return Response(
                { "message" : "비밀번호가 일치하지 않습니다. 동일한 비밀번호를 입력해주세요." },
                status=status.HTTP_400_BAD_REQUEST
            )
        # 핸드폰 번호 유효성 체크
        elif len(request.data["userphonenum"]) != 11:
            print("===ERROR: 'userphonenum' 데이터가 올바르지 않습니다.===")
            return Response(
                { "message" : "핸드폰 번호가 올바르지 않습니다. 다시 입력해주세요." },
                status=status.HTTP_400_BAD_REQUEST
            )
        # e_mail 유효성 체크
        elif request.data["e_mail"].find("@") == -1 or request.data["e_mail"].find(".com") == -1:
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

        # pass_field 데이터 암호화
        request.data["pass_field"] = PasswordHasher().hash(request.data["pass_field"])

        # serializer 지정 
        serializer = UserSerializer(data=request.data)

        # request.data 유효성 검사
        if serializer.is_valid():
            user = serializer.save()
            print('===SUCCEESS: 회원가입에 성공했습니다!===')
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

        print("===ERROR: 회원가입에 실패했습니다.===")
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

class Mypage(APIView):
    def get(self, request):
        # react로 전송할 json 객체
        resData = {}

        # request data로 해당 user model 불러오기
        user_id = request.query_params.get("params")
        userModel = User.objects.get(id=user_id)
        
        # user model에 해당하는 target model 불러오기
        key = userModel.usernum
        if Target.objects.get(usernum=key):
            targetModel = Target.objects.get(usernum=key)
        else:
            print("==ERROR: 해당하는 target 데이터가 없습니다.===")

        try:
            resData["user"] = []
            resData["user"].append({
                "id" : userModel.id,
                "username" : userModel.username,
                "userphonenum" : userModel.userphonenum,
                "e_mail" : userModel.e_mail,
                "userage" : userModel.userage,
            })
        except:
            print("===ERROR: User 모델을 불러오는데 실패했습니다.===")

        try:
            resData["target"] = []
            resData["target"].append({
                "targetname" : targetModel.targetname,
                "gender" : targetModel.gender,
                "birthdate" : targetModel.birthdate,
                "targetage" : targetModel.targetage,
                "missingornot" : targetModel.missingornot,
                "urgentnum" : targetModel.urgentnum,
            })
        except:
            print("===ERROR: Target 모델을 불러오는데 실패했습니다.===")
            
        return Response(resData, status=status.HTTP_200_OK)