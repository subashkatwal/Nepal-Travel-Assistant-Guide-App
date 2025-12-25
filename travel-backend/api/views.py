from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .serailizer import DestinationSerializer,ProductSerializer,PermitApplicationSerializer
from .models import Destination,Product,PermitApplication
import requests
from django.http import JsonResponse
from django.conf import settings
import json
import numpy as np 
from rest_framework.decorators import api_view


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



# Submit new permit
class PermitApplicationCreateView(generics.CreateAPIView):
    queryset = PermitApplication.objects.all()
    serializer_class = PermitApplicationSerializer


# List all permits (for user dashboard)
class PermitApplicationListView(generics.ListAPIView):
    queryset = PermitApplication.objects.all().order_by('-submitted_at')
    serializer_class = PermitApplicationSerializer


# Single permit detail (for receipt data)
class PermitApplicationDetailView(generics.RetrieveAPIView):
    queryset = PermitApplication.objects.all()
    serializer_class = PermitApplicationSerializer



#Khalti integration 

from django.conf import settings

KHALTI_SECRET_KEY = settings.KHALTI_SECRET_KEY



@api_view(['POST'])
def initiate_khalti_payment(request):
    """
    Initiate Khalti payment using Khalti epayment API v2
    """
    try:
        data = request.data
        
        # Validate required fields
        required_fields = ['return_url', 'website_url', 'amount', 'purchase_order_id', 'purchase_order_name']
        for field in required_fields:
            if field not in data:
                return Response(
                    {'error': f'{field} is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Validate amount (must be positive and in paisa)
        amount = data.get('amount')
        if not isinstance(amount, (int, float)) or amount <= 0:
            return Response(
                {'error': 'Amount must be a positive number in paisa'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Prepare payload for Khalti
        payload = {
            "return_url": data['return_url'],
            "website_url": data['website_url'],
            "amount": int(amount),  # Amount in paisa (must be integer)
            "purchase_order_id": data['purchase_order_id'],
            "purchase_order_name": data['purchase_order_name'],
        }
        
        # Add optional customer info if provided
        if 'customer_info' in data:
            payload['customer_info'] = data['customer_info']
        
        # Add optional product details if provided
        if 'product_details' in data:
            payload['product_details'] = data['product_details']
        
        # Add optional amount breakdown if provided
        if 'amount_breakdown' in data:
            payload['amount_breakdown'] = data['amount_breakdown']
        
        print("📤 Sending to Khalti:", payload)
        
        # Call Khalti API
        headers = {
            'Authorization': f'Key {KHALTI_SECRET_KEY}',
            'Content-Type': 'application/json',
        }
        
        response = requests.post(
            'https://a.khalti.com/api/v2/epayment/initiate/',
            json=payload,
            headers=headers,
            timeout=30  # Add timeout
        )
        
        print(f"📥 Khalti response status: {response.status_code}")
        print(f"📥 Khalti response: {response.text}")
        
        if response.status_code == 200:
            khalti_response = response.json()
            return Response({
                'success': True,
                'payment_url': khalti_response.get('payment_url'),
                'pidx': khalti_response.get('pidx'),
                'expires_at': khalti_response.get('expires_at'),
                'expires_in': khalti_response.get('expires_in'),
            })
        else:
            error_data = response.json() if response.text else {}
            return Response(
                {
                    'success': False,
                    'error': 'Payment initiation failed',
                    'details': error_data,
                    'status_code': response.status_code
                },
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request error: {str(e)}")
        return Response(
            {'error': f'Network error: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def verify_khalti_payment(request):
    """
    Verify Khalti payment using pidx (epayment API v2)
    """
    try:
        pidx = request.data.get('pidx')
        
        if not pidx:
            return Response(
                {'error': 'pidx is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        print(f"🔍 Verifying payment with pidx: {pidx}")
        
        # Call Khalti API to verify payment
        headers = {
            'Authorization': f'Key {KHALTI_SECRET_KEY}',
            'Content-Type': 'application/json',
        }
        
        payload = {
            'pidx': pidx
        }
        
        response = requests.post(
            'https://a.khalti.com/api/v2/epayment/lookup/',
            json=payload,
            headers=headers,
            timeout=30
        )
        
        print(f"📥 Verification response status: {response.status_code}")
        print(f"📥 Verification response: {response.text}")
        
        if response.status_code == 200:
            verification_data = response.json()
            
            # Check if payment was completed
            payment_status = verification_data.get('status')
            
            if payment_status == 'Completed':
                return Response({
                    'success': True,
                    'message': 'Payment verified successfully',
                    'data': {
                        'pidx': verification_data.get('pidx'),
                        'total_amount': verification_data.get('total_amount'),
                        'status': verification_data.get('status'),
                        'transaction_id': verification_data.get('transaction_id'),
                        'fee': verification_data.get('fee'),
                        'refunded': verification_data.get('refunded'),
                        'purchase_order_id': verification_data.get('purchase_order_id'),
                        'purchase_order_name': verification_data.get('purchase_order_name'),
                    }
                })
            elif payment_status == 'Pending':
                return Response({
                    'success': False,
                    'message': 'Payment is still pending',
                    'status': payment_status,
                    'data': verification_data
                }, status=status.HTTP_400_BAD_REQUEST)
            elif payment_status == 'Refunded':
                return Response({
                    'success': False,
                    'message': 'Payment has been refunded',
                    'status': payment_status,
                    'data': verification_data
                }, status=status.HTTP_400_BAD_REQUEST)
            elif payment_status == 'Expired':
                return Response({
                    'success': False,
                    'message': 'Payment link has expired',
                    'status': payment_status,
                    'data': verification_data
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    'success': False,
                    'message': f"Payment status: {payment_status}",
                    'status': payment_status,
                    'data': verification_data
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            error_data = response.json() if response.text else {}
            return Response(
                {
                    'success': False,
                    'error': 'Payment verification failed',
                    'details': error_data,
                    'status_code': response.status_code
                },
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request error: {str(e)}")
        return Response(
            {'error': f'Network error: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Recommendation algorithm
ALL_TAGS = ["Trekking", "Cultural", "Adventure", "Nature", "Family", "Religious"]

def parse_tags(tags_str):
    # Fixed: split by comma instead of empty string
    return [tag.strip() for tag in tags_str.split(",") if tag.strip()]

def destination_to_vector(dest):
    price = dest.price / 10000

    try: 
        days = int(dest.duration.split()[0])
    except:
        days = 3

    dest_tags = parse_tags(dest.tags)
    tag_vector = [1 if tag in dest_tags else 0 for tag in ALL_TAGS]

    # Fixed: added closing parenthesis
    return np.array([price, days] + tag_vector)

def user_to_vector(user):
    price = user['budget'] / 10000
    days = user['days']
    tag_vector = [1 if tag == user['travel_type'] else 0 for tag in ALL_TAGS]
    return np.array([price, days] + tag_vector)

def recommend_destination(destinations, user, top_k=3):
    dest_vectors = []
    dest_objects = []

    for d in destinations:
        dest_vectors.append(destination_to_vector(d))
        dest_objects.append(d)

    user_vector = user_to_vector(user)

    similarity = cosine_similarity([user_vector], dest_vectors)[0]
    ranked = sorted(zip(dest_objects, similarity), key=lambda x: x[1], reverse=True)
    return [r[0] for r in ranked[:top_k]]


@api_view(["GET"])
def destination_list(request):
    destinations = Destination.objects.all()
    serialized = DestinationSerializer(destinations, many=True).data

    # Take user preferences from query parameters
    try:
        user_pref = {
            "budget": int(request.GET.get("budget", 3500)),
            "days": int(request.GET.get("days", 3)),
            "travel_type": request.GET.get("travel_type", "Trekking")
        }
    except ValueError:
        user_pref = {"budget": 3500, "days": 3, "travel_type": "Trekking"}

    recommended = recommend_destination(destinations, user_pref, top_k=3)

    return Response({
        "all_destinations": serialized,
        "recommended_destinations": DestinationSerializer(recommended, many=True).data
    })



