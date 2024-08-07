from django.urls import path

from .views import createUser, list_speciality, login

urlpatterns = [
    path("especialidades", list_speciality, name="speciality"),
    path("users", createUser, name="register"),
    path("users/login", login, name="login"),
]
