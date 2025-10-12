from django.contrib import admin
from .models import Destination,Product


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'duration', 'price')
    search_fields = ('title', 'tags', 'category')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'category')
    search_fields = ('title', 'tags', 'category')
    list_filter = ('category',)
