from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login as auth_login, authenticate, logout as auth_logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required

# Signup view
def signup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect('signup')

        # Using email as username to satisfy default User model
        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()
        messages.success(request, "Account created successfully. Please log in.")
        return redirect('login')

    return render(request, 'signup.html')


# Login view
def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email') 
        password = request.POST.get('password')
        remember_me = request.POST.get('remember_me')

        # Using email as username
        user = authenticate(request, username=email, password=password)

        if user is not None:
            auth_login(request, user)

            if remember_me:
                request.session.set_expiry(1209600)  # 2 weeks
            else:
                request.session.set_expiry(0) 

            return redirect('home')  
        else:
            messages.error(request, "Invalid email or password.")
            return redirect('login')

    return render(request, 'login.html')

# Logout view
def logout_view(request):
    auth_logout(request)
    return redirect('login')


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




def login_form(request):
    return render(request, 'login.html')

def signup_form(request):
    return render(request, 'signup.html')


