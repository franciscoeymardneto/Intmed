from django.core.exceptions import ValidationError
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
            name="Dr. Ludwig Maxis",
            crm="98765432-1/CE",
            email="dr.lud.maxis@intmed.com",
            speciality=self.speciality,
        )
        self.assertEqual(str(doctor), "Dr. Ludwig Maxis - 98765432-1/CE")

    def test_unique_crm(self):
        # Testa o unique do campo crm
        Doctor.objects.create(
            name="Dr. Stephen Strange",
            crm="12345678-9/CE",
            email="dr.stephen.strange@example.com",
            speciality=self.speciality,
        )
        with self.assertRaises(ValidationError):
            doctor = Doctor(
                name="Dra. Maria Oliveira",
                crm="12345678-9/CE",
                email="dr.maria.oliveira@example.com",
                speciality=self.speciality,
            )
            doctor.full_clean()
