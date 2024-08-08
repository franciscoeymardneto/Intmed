from django.urls import path

from .views import (createUser, list_consults, list_doctors, list_schedules,
                    list_speciality, login)

urlpatterns = [
    path("especialidades", list_speciality, name="speciality"),
    path("consultas", list_consults, name="list_consults"),
    path("medicos", list_doctors, name="list_doctors"),
    path("agendas", list_schedules, name="list_schedules"),
    path("users", createUser, name="register"),
    path("users/login", login, name="login"),
]
