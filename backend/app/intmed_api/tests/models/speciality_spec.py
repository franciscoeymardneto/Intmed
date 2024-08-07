from django.test import TestCase

from ...models import Speciality


class SpecialityModelTestSuit(TestCase):
    def test_create_speciality(self):
        # Testa a criação de uma especialidade com todos os campos válidos
        speciality = Speciality.objects.create(name="Cardiologista")
        self.assertEqual(speciality.name, "Cardiologista")
