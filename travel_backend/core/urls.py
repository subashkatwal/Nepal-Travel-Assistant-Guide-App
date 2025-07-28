from django.urls import path
from django.http import JsonResponse
from .admin import admin
from .api_views import *
from .views import *
from . import views
from .views import destination

urlpatterns = [
     path('admin/', admin.site.urls),
     path('', views.homepage, name='home'),
    path('signup/', views.signup, name='signup_page'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout_page'),
    path('login-form/', views.login_form, name='login_form'),
    path('signup-form/', views.signup_form, name='signup_form'),

     path('trip_cost/', views.trip_cost, name='trip_cost'),
    path("recommendations/", views.destination, name="destinations"),
    path('local-pricing/', views.local_pricing, name='local_pricing'),
    path('packages/', views.packages, name='packages'),
    path("permit/", views.permit, name="permit"),
    path('profile/', views.profile, name='profile'),
    # path('success/', views.success_page, name='success_page'),
  
   
]
