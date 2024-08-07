from datetime import timedelta

from django.test import TestCase
from django.utils import timezone

from ...models import Doctor, Schedule, Speciality


class ScheduleModelTestSuit(TestCase):
    currentTimezone = timezone.localtime(timezone.now())
    hours = [
        (currentTimezone + timedelta(minutes=1)).time(),
        (currentTimezone + timedelta(hours=1)).time(),
        (currentTimezone + timedelta(hours=2)).time(),
        (currentTimezone + timedelta(hours=3)).time(),
    ]

    def setUp(self):
        self.doctor = Doctor.objects.create(
            name="Dr. Edward Richtofen",
            crm="12345678-9/CE",
            email="dr.ed.richtofen@intmed.com",
        )
        self.doctor.speciality = Speciality.objects.create(name="Cardiologia")

    def test_create_schedule(self):
        # Testa a criação de uma agenda com todos os campos válidos
        schedule = Schedule.objects.create(
            doctor=self.doctor, day=self.currentTimezone.date(), hours=self.hours
        )

        self.assertEqual(schedule.doctor, self.doctor)
        self.assertEqual(schedule.day, self.currentTimezone.date())
        self.assertEqual(schedule.hours, self.hours)

    def test_str_method(self):
        # Testa o método __str__ do modelo
        schedule = Schedule.objects.create(
            doctor=self.doctor, day=self.currentTimezone.date(), hours=self.hours
        )
        self.assertEqual(
            str(schedule),
            f"Dr. Edward Richtofen - {self.currentTimezone.date().strftime("%d/%m/%Y")}"
        )

    def test_list_consult_from_this_schedule(self):
        # Testa o método ListConsultFromThisSchedule
        consult_time = (self.currentTimezone + timedelta(minutes=1)).time()
        schedule = Schedule.objects.create(
            doctor=self.doctor, day=self.currentTimezone.date(), hours=self.hours
        )
        from ...models import Consult
        Consult.objects.create(schedule=schedule, hour=consult_time)
        self.assertIn(consult_time, schedule.ListConsultFromThisSchedule())
