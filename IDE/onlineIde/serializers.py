from rest_framework import serializers # Importing Serializers library to create serializers
from .models import User, SubTab # Imporiting models from models folder

# Creating the Serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class SubSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTab
        fields = "__all__"