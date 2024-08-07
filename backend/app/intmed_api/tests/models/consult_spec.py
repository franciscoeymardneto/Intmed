from datetime import timedelta

from django.contrib.auth.models import User
# from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone

from ...models import Consult, Doctor, Schedule, Speciality


class CosultModelTestSuit(TestCase):
    currentTimezone = timezone.localtime(timezone.now())
    hours = [
        (currentTimezone + timedelta(minutes=1)).time(),
        (currentTimezone + timedelta(hours=1)).time(),
        (currentTimezone + timedelta(hours=2)).time(),
        (currentTimezone + timedelta(hours=3)).time(),
    ]

    def setUp(self):
        self.speciality = Speciality.objects.create(name="Cardiologia")

        self.doctor = Doctor.objects.create(
            name="Dr. Edward Richtofen",
            crm="12345678-9/CE",
            email="dr.ed.richtofen@intmed.com",
            speciality=self.speciality,
        )

        self.schedule = Schedule.objects.create(
            doctor=self.doctor, day=self.currentTimezone.date(), hours=self.hours
        )

        self.client = User.objects.create_user(
            username="client", password="clientpassword", email="client@example.com"
        )

    def test_create_consult(self):
        # Testa a criação de uma consulta com dados válidos
        hour = (self.currentTimezone + timedelta(minutes=1)).time()
        consult = Consult.objects.create(
            schedule=self.schedule, hour=hour, client=self.client
        )
        self.assertEqual(consult.schedule, self.schedule)
        self.assertEqual(consult.hour, hour)
        self.assertEqual(consult.client, self.client)

    def test_str_method(self):
        # Testa o método __str__ do modelo
        consult = Consult.objects.create(
            schedule=self.schedule, hour=self.hours[0], client=self.client
        )
        self.assertEqual(
            str(consult),
            f"{self.schedule.__str__()} - {consult.hour.strftime("%H:%M")}"
        )

