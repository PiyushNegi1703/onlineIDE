from django.urls import path #Importing Path library to create path routes
from . import views #Impoting the views for the request handling
from rest_framework.routers import DefaultRouter #Importing DefaultRouter to create a router

router = DefaultRouter() #Providing the value of default router to router variable

router.register("user", views.UserViewSet) #Registering the user Route
router.register("submit", views.SubViewSet) #Registering the submit Route

# Creating the routes
urlpatterns = [
    path('', views.hello_world, name="helloWorld"),
    path('login/', views.LoginView.as_view())
]

urlpatterns += router.urls #Adding the urlpatterns registered above to urlpatterns