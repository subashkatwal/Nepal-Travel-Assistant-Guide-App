from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def home(request):
    return render(request,'base.html')



def homepage(request):
    return render(request, 'homepage.html')




@login_required
def trip_cost(request):
    return render(request, 'trip_cost.html')


@login_required
def destination(request):
    return render(request, 'destinations.html')



@login_required
def local_pricing(request):
    return render(request, 'local-pricing.html')



@login_required
def packages(request):
    return render(request, 'packages.html')



@login_required
def profile(request):
    return render(request, 'profile.html')


def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request,'signup.html')

def logout(request):
    return render(request,'home.html')



def login_modal(request):
    return render(request, 'partials/login_form.html')

def signup_modal(request):
    return render(request, 'partials/signup_form.html')

