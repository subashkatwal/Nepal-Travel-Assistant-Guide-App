from django.urls import path
from django.http import JsonResponse
from .admin import admin
from .api_views import login_api, signup_api, logout_api

from .views import destination_list

urlpatterns = [
     path('admin/', admin.site.urls),
    path('api/destinations/', destination_list),
    path('api/signup/', signup_api, name='signup_api'),
    path('api/login/', login_api, name='login_api'),
    path('api/logout/', logout_api, name='logout_api'),

    path('', lambda request: JsonResponse({"message": "Welcome to Nepal Guide API!"})),
]
