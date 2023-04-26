from django.shortcuts import render
from django.http import HttpResponse # Importing the httpresponse library to get the response
from rest_framework.viewsets import ModelViewSet
from .models import User, SubTab
from .serializers import UserSerializer, SubSerializer
from .utils import create_code_file, execute_code


# Create your views here.

def hello_world(request): # A view responding as hello_world
    return HttpResponse("Hello World")

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SubViewSet(ModelViewSet):
    queryset = SubTab.objects.all()
    serializer_class = SubSerializer

    def create(self, request, *args, **kwargs):
        request.data["status"] = "P"
        file_name = create_code_file(request.data.get("code"), request.data.get("language"))
        output = execute_code(file_name, request.data.get("language"))
        request.data["output"] = output
        return super().create(request, args, kwargs)