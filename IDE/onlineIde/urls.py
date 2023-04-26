from django.urls import path # Importing Path library to create path routes
from . import views # Impoting the views for the request handling

# Creating the routes
urlpatterns = [
    path('', views.hello_world, name="helloWorld")
]