from django.urls import path,re_path
from . import views
from .views import DestinationListView,ProductList,ProductDetail

urlpatterns = [
    path('signup/', views.signup_api, name='api_signup'),
    path('login/', views.login_api, name='api_login'),
    path('logout/', views.logout_api, name='api_logout'),
    path("check-auth/", views.check_auth, name="check_auth"),
    path('destinations/',DestinationListView.as_view(), name='destination-list'),
     path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
]








