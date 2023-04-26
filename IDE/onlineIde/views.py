from django.http import HttpResponse # Importing the httpresponse library to get the response
from django.contrib.auth.models import User
from django.contrib.auth import login
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import SubTab
from .serializers import SubSerializer, UserSerializer
from .utils import create_code_file, execute_code
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView


# Create your views here.

def hello_world(request): #A view responding as hello_world
    return HttpResponse("Hello World")

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()

class SubViewSet(ModelViewSet): #Creating a ViewSet for submissions
    queryset = SubTab.objects.all()
    serializer_class = SubSerializer

    def create(self, request, *args, **kwargs): #A function to create the submissions
        request.data["status"] = "P"
        file_name = create_code_file(request.data.get("code"), request.data.get("language"))
        output = execute_code(file_name, request.data.get("language"))
        request.data["output"] = output
        return super().create(request, args, kwargs)