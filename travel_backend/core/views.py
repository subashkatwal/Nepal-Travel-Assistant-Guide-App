from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from .forms import PermitApplicationForm
import os
import pickle
import pandas as pd
from django.conf import settings

User = get_user_model()

# Signup view
def signup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        role = request.POST.get('role')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect('signup')

        # Using email as username to satisfy default User model
        user = User.objects.create_user(username=email, email=email, password=password)
        if role == "admin":
            user.is_staff = True  # Give admin access
        else:
            user.is_staff = False
            
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

        user = authenticate(request, username=email, password=password)

        if user is not None:
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




# Loading model once when Django starts
MODEL_PATH = os.path.join(settings.BASE_DIR,'travel_backend', 'core', 'Recommendation-System', 'recommendation_model.pkl')


with open(MODEL_PATH, "rb") as f:
    df, encoder, scaler, model = pickle.load(f)

# 🔹 Recommendation function
def recommend_places(category, min_budget, max_budget):
    input_cat = encoder.transform([[category]]).toarray()
    avg_budget = (min_budget + max_budget) / 2
    scaled_budget = scaler.transform([[avg_budget]])[0]

    input_vector = list(input_cat[0]) + list(scaled_budget)
    distances, indices = model.kneighbors([input_vector])

    recommendations = df.iloc[indices[0]][['city', 'category', 'estimated_cost']]
    filtered = recommendations[
        (recommendations['estimated_cost'] >= min_budget) &
        (recommendations['estimated_cost'] <= max_budget)
    ]

    return filtered.reset_index(drop=True)


# 🔹 View for recommendations
@login_required
def destination(request):
    recommendations = None

    if request.method == "GET" and "category" in request.GET:
        category = request.GET.get("category")
        min_budget = int(request.GET.get("min_budget"))
        max_budget = int(request.GET.get("max_budget"))

        recommendations = recommend_places(category, min_budget, max_budget)

    if recommendations is not None and not recommendations.empty:
        recommendations_list = recommendations.to_dict(orient='records')
    else:
        recommendations_list = []

    return render(request, "destinations.html", {"recommendations": recommendations_list})


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


def permit(request):
    success = False
    if request.method == 'POST':
        form = PermitApplicationForm(request.POST)
        if form.is_valid():
            form.save()  
            success = True 
        else:
            print(form.errors)  # Print validation errors 
    else:
        form = PermitApplicationForm()

    return render(request, 'permit.html', {'form': form,'success': success})



