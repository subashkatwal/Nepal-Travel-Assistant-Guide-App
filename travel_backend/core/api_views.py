from rest_framework import status
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout

@api_view(['POST'])
def signup_api(request):
   first_name=request.data.get('firstName')
   last_name=request.data.get('lastName')
   email=request.data.get('signupEmail')
   password=request.data.get('signupPassword')
   confirm_password=request.data.get('confirmPassword')

   if not all ([first_name,last_name,email,password,confirm_password]):
      return Response({'error':'Please fill all the fields'},status=status.HTTP_400_BAD_REQUEST)
   
   if password!=confirm_password:
      return Response({'error':'Password do not match'},status=status.HTTP_400_BAD_REQUEST)
   
   if User.objects.filter(username=email).exists():
      return Response({'error':'Email already registered'},status=status.HTTP_400_BAD_REQUEST)
   
   user=User.objects.create_user(username=email,email=email,password=password,first_name=first_name, last_name=last_name)
   user.save()

   return Response({'Success':'User created successfully'},status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # Creates session
        return Response({'success': 'Logged in successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_api(request):
    logout(request)
    return Response({'success': 'Logged out'}, status=status.HTTP_200_OK)