from django.urls import path
from django.http import JsonResponse
from .admin import admin
from .api_views import *
from .views import *
from . import views
from .views import destination

urlpatterns = [
    #  path('admin/', admin.site.urls),
     path('', views.homepage, name='home'),
    path('signup/', views.signup, name='signup_page'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout_page'),
    path('login-form/', views.login_form, name='login_form'),
    path('signup-form/', views.signup_form, name='signup_form'),
path("shop/", views.shop_view, name="shop"),
     path('trip_cost/', views.trip_cost, name='trip_cost'),
    path("recommendations/", views.destination, name="destinations"),
    path('local-pricing/', views.local_pricing, name='local_pricing'),
    
    path("permit/", views.permit, name="permit"),
    path('profile/', views.profile, name='profile'),

     path("shop/", views.shop_view, name="shop"),
    path("cart/add/<int:pk>/", views.add_to_cart, name="add_cart"),
    path("cart/", views.view_cart, name="cart_page"),
    path("cart/remove/<int:pk>/", views.remove_from_cart, name="remove_cart"),
  
   #for the cart 
    # path('packages/', views.packages, name='packages'),
    # path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    # path('cart/', views.view_cart, name='view_cart'),
    # path('update-cart/<int:product_id>/', views.update_cart, name='update_cart'),
    # path('remove-from-cart/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    
]
