from django.shortcuts import render, redirect

# firstPage home
def home(request):
    return render(request, 'home.html')

# X X X X X firstPage details X X X X X
def about(request):
    return render(request, 'about.html')