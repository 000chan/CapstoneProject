from django.shortcuts import render, redirect
from .models import User
from .forms import RegisterForm, LoginForm

# register
def register(request):
    register_form = RegisterForm()
    context = {'forms' : register_form}
    
    if request.method == 'GET':
        return render(request, 'register.html', context)

    elif request.method == 'POST':
        register_form = RegisterForm(request.POST)
        if register_form.is_valid():
            user = User(
                user_id = register_form.user_id,
                user_pw = register_form.user_pw,
                user_name = register_form.user_name,
                user_gender = register_form.user_gender,
                user_resident_number = register_form.user_resident_number,
                user_phone_number = register_form.user_phone_number,
                user_emergency_number = register_form.user_emergency_number,
                user_email = register_form.user_email,
                user_address = register_form.user_address,
                user_protected_name = register_form.user_protected_name,
            )
            userInfo = user.save()
            return redirect('/')
        else:
            context['forms'] = register_form
        return render(request, 'register.html', context)

# login
def login(request):
    loginform = LoginForm()
    context = {'forms' : loginform}

    if request.method == 'GET':
        return render(request, 'login.html', context)

    elif request.method == 'POST':
        loginform = LoginForm(request.POST)

        if loginform.is_valid():
            request.session['login_session'] = loginform.login_session
            request.session.set_expiry(0)
            context['login_session'] = request.session['login_session']
            return render(request, 'service.html', context)
        else:
            context['forms'] = loginform
            if loginform.errors:
                for value in loginform.errors.values():
                    context['error'] = value
        return render(request, 'login.html', context)

# logout
def logout(request):
    request.session.flush()
    return redirect('/')


################################################################################################################################################
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .serializer import TestSerializer, TestRegisterSerializer
from .models import testLogin, testRegister

class testLogin(APIView):
    def get(self, request):
        logindata = testLogin.objects.all()
        serializer = TestSerializer(logindata, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TestSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print('===============================================================================================')
            print('success')

            # serializer.data
            print("-----[1. serializer.data]-----")
            print(serializer.data)
            print(type(serializer.data))

            # request.data
            print("-----[2. request.data]-----")
            print(request.data)
            print(type(request.data))

            # request
            print("-----[3. request]-----")
            print(request)
            print(type(request))
            print('===============================================================================================')
            return Response(request.data)
        print('fail')
        return Response(request.data)

class testRegister(APIView):
    def get(self, request):
        registerdata = testRegister.objects.all()
        serializer = TestRegisterSerializer(registerdata, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TestRegisterSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print('===============================================================================================')
            print('success')

            # serializer.data
            print("-----[1. serializer.data]-----")
            print(serializer.data)
            print(type(serializer.data))

            # request.data
            print("-----[2. request.data]-----")
            print(request.data)
            print(type(request.data))

            # request
            print("-----[3. request]-----")
            print(request)
            print(type(request))
            print('===============================================================================================')
            return Response(request.data)
        print('fail')
        return Response(request.data)