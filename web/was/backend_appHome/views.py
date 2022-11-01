from django.shortcuts import render, redirect

# firstPage home
def home(request):
    return render(request, 'home.html')