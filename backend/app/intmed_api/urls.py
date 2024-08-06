from django.urls import path

from .views import createUser, login

urlpatterns = [
    path("register", createUser, name="register"),
    path("users/login", login, name="login"),
]
