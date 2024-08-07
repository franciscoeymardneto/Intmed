from datetime import timedelta

from django.test import TestCase
from django.utils import timezone

from ...models import Doctor, Schedule, Speciality


class ScheduleModelTestSuit(TestCase):
    def setUp(self):
        self.doctor = Doctor.objects.create(
            name="Dr. Edward Richtofen",
            crm="12345678-9/CE",
            email="dr.ed.richtofen@intmed.com",
        )
        self.doctor.speciality = Speciality.objects.create(name="Cardiologia")

    def test_create_schedule(self):
        # Testa a criação de uma agenda com todos os campos válidos
        currentTimezone = timezone.localtime(timezone.now())
        hours = [
            (currentTimezone + timedelta(minutes=1)).time(),
            (currentTimezone + timedelta(hours=1)).time(),
            (currentTimezone + timedelta(hours=2)).time(),
            (currentTimezone + timedelta(hours=3)).time(),
        ]
        schedule = Schedule.objects.create(
            doctor=self.doctor, day=currentTimezone.date(), hours=hours
        )

        self.assertEqual(schedule.doctor, self.doctor)
        self.assertEqual(schedule.day, currentTimezone.date())
        self.assertEqual(schedule.hours, hours)
