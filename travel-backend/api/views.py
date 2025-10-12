from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .serailizer import DestinationSerializer,ProductSerializer
from .models import Destination,Product


User = get_user_model()

# Signup API
@api_view(['POST'])
def signup_api(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    role = data.get('role', 'user')

    if password != confirm_password:
        return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=email, email=email, password=password)
    user.is_staff = True if role == "admin" else False
    user.save()

    return Response({"success": "Account created successfully."}, status=status.HTTP_201_CREATED)


# Login API
@api_view(['POST'])
def login_api(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return Response({"success": "Logged in successfully."})
    else:
        return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)


# Logout API
@csrf_exempt
@api_view(['POST'])
def logout_api(request):
    logout(request)
    return Response({"success": "Logged out successfully."})


@api_view(['GET'])
def check_auth(request):
    if request.user.is_authenticated:
        return Response({"logged_in": True, "email": request.user.email})
    return Response({"logged_in": False})

class DestinationListView(generics.ListAPIView):
    queryset= Destination.objects.all()
    serializer_class = DestinationSerializer

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer