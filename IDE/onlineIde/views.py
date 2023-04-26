from django.shortcuts import render
from django.http import HttpResponse # Importing the httpresponse library to get the response

# Create your views here.

def hello_world(request): # A view responding as hello_world
    return HttpResponse("Hello World")