from rest_framework import serializers # Importing Serializers library to create serializers
from .models import SubTab # Imporiting models from models folder
from django.contrib.auth.models import User

# Creating the Serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class SubSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTab
        fields = "__all__"