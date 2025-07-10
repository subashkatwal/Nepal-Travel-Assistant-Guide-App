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
    path('login/', views.login, name='login_page'),
    path('logout/', views.logout, name='logout_page'),
    path('login/', views.login_modal, name='login_modal'),
path('signup/', views.signup_modal, name='signup_modal'),

     path('trip_cost/', views.trip_cost, name='trip_cost'),
    path('destinations/', views.destination, name='destinations'),
    path('local-pricing/', views.local_pricing, name='local_pricing'),
    path('packages/', views.packages, name='packages'),
    path('profile/', views.profile, name='profile'),
    # path('test/', test, name='test'),
    path('', lambda request: JsonResponse({"message": "Welcome to Nepal Guide API!"})),
]
