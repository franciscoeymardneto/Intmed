from django.test import TestCase

from ...models import Doctor, Speciality


class DoctorModelTestSuit(TestCase):
    def setUp(self):
        self.speciality = Speciality.objects.create(name="Cardiologia")

    def test_create_doctor(self):
        # Testa a criação de um médico com todos os campos válidos
        doctor = Doctor.objects.create(
            name="Dr. Edward Richtofen",
            crm="12345678-9/CE",
            email="dr.ed.richtofen@intmed.com",
            speciality=self.speciality,
        )
        self.assertEqual(doctor.name, "Dr. Edward Richtofen")
        self.assertEqual(doctor.crm, "12345678-9/CE")
        self.assertEqual(doctor.email, "dr.ed.richtofen@intmed.com")
        self.assertEqual(doctor.speciality, self.speciality)

    def test_str_method(self):
        # Testa o método __str__ do modelo
        doctor = Doctor.objects.create(
            name="Dr. Edward Richtofen",
            crm="12345678-9/CE",
            email="dr.ed.richtofen@intmed.com",
            speciality=self.speciality,
        )
        self.assertEqual(str(doctor), "Dr. Edward Richtofen - 12345678-9/CE")
