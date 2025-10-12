from rest_framework import serializers
from .models import Destination,Product

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
        fields = '__all__'
