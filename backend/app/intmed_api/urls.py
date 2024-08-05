from django.urls import path

from .views import createUser, login

urlpatterns = [
    path("register/", createUser, name="register"),
    path("login/", login, name="login"),
]
