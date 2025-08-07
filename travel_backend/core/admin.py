
from django.contrib import admin
from .models import PermitApplication,Product,Category

@admin.register(PermitApplication)
class PermitApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'passport_number', 'email', 'destination', 'created_at')
    search_fields = ('full_name', 'passport_number', 'email', 'destination')
    list_filter = ('destination', 'created_at')
    ordering = ('-created_at',)


admin.site.register(Category)
admin.site.register(Product)