from django.urls import path

from .views import createUser, list_consults, list_speciality, login

urlpatterns = [
    path("especialidades", list_speciality, name="speciality"),
    path("consultas", list_consults, name="list_consults"),
    path("users", createUser, name="register"),
    path("users/login", login, name="login"),
]
