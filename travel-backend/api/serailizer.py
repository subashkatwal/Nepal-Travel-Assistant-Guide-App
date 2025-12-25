from rest_framework import serializers
from .models import Destination,Product, PermitApplication,Order,OrderItem


class PermitApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermitApplication
        fields = "__all__"
        read_only_fields = ("status", "permit_id", "rejection_reason")


class DestinationSerializer(serializers.ModelSerializer):
    tags_list = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = ['id', 'title', 'tags', 'tags_list', 'duration', 'price', 'image_url', 'category', 'description']

    def get_tags_list(self, obj):
        return [tag.strip() for tag in obj.tags.split(',')] if obj.tags else []
    
class ProductSerializer(serializers.ModelSerializer):
    tags_list = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = "__all__"



class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'


class PermitApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermitApplication
        fields = "__all__"
        read_only_fields = ("status", "permit_id", "rejection_reason")
