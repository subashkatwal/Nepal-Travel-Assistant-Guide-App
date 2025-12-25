from django.urls import path,re_path,include
from . import views
from .views import *


urlpatterns = [
    path('signup/', views.signup_api, name='api_signup'),
    path('login/', views.login_api, name='api_login'),
    path('logout/', views.logout_api, name='api_logout'),
    path("check-auth/", views.check_auth, name="check_auth"),
    path('destinations/',DestinationListView.as_view(), name='destination-list'),
     path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    
        path('permits/apply/', PermitApplicationCreateView.as_view(), name='permit-apply'),
    path('permits/all/', PermitApplicationListView.as_view(), name='permit-list'),
    path('permits/<int:pk>/', PermitApplicationDetailView.as_view(), name='permit-detail'),
path('payments/khalti/initiate/', initiate_khalti_payment, name='khalti-initiate'),
    path('payments/khalti/verify/', verify_khalti_payment, name='khalti-verify'),
    
path('api/destinations/', views.destination_list, name='destination-list'),
]









