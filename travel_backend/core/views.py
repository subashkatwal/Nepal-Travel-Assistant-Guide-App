from django.shortcuts import render, redirect,get_object_or_404
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
from .models import Product,Category

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
# @login_required
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


# @login_required
def local_pricing(request):
    return render(request, 'local-pricing.html')


def packages(request):
    products = Product.objects.all()
    return render(request, 'packages.html', {'products': products})

@login_required
def profile(request):
    return render(request, 'profile.html')


def login_form(request):
    return render(request, 'login.html')

def signup_form(request):
    return render(request, 'signup.html')


def shop_view(request):
    category_name = request.GET.get('category', None)
    categories = Category.objects.all()
    if category_name:
        products = Product.objects.filter(category__cname=category_name)
    else:
        products = Product.objects.all()
    return render(request, "shop.html", {
        "products": products,
        "selected_category": category_name,
        "categories": categories,
    })

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



#cart
def shop_view(request):
    products = Product.objects.all()
    cart = request.session.get("cart", {})

    cart_count = 0
    if isinstance(cart, dict):
        cart_count = sum(cart.values())
    elif isinstance(cart, list):
        cart_count = len(cart)

    return render(request, "shop.html", {
        "products": products,
        "cart_count": cart_count
    })



def add_to_cart(request, pk):
    cart = request.session.get("cart", [])
    if pk not in cart:
        cart.append(pk)
    request.session["cart"] = cart
    return redirect("cart_page")

def view_cart(request):
    cart = request.session.get("cart", {})
    product_ids = cart.keys()
    products = Product.objects.filter(id__in=product_ids)
    
    # annotate each product with quantity from cart
    for product in products:
        product.quantity = cart.get(str(product.id), 0)

    total_price = sum(product.price * product.quantity for product in products)
    
    return render(request, "cart.html", {
        "products": products,
        "total_price": total_price
    })

def remove_from_cart(request, pk):
    cart = request.session.get("cart", [])
    if pk in cart:
        cart.remove(pk)
    request.session["cart"] = cart
    return redirect("cart_page")

from django.http import JsonResponse

def add_to_cart(request, pk):
    cart = request.session.get("cart", {})

    if isinstance(cart, list):
        new_cart = {}
        for item in cart:
            new_cart[str(item)] = new_cart.get(str(item), 0) + 1
        cart = new_cart
    cart[str(pk)] = cart.get(str(pk), 0) + 1

    # Save back to session
    request.session["cart"] = cart

    # Calculate cart count (total quantity)
    cart_count = sum(cart.values())

    return JsonResponse({"cart_count": cart_count})
