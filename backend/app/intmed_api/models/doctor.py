from django.db import models


class Doctor(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=100, blank=False, null=False)
    crm: str = models.CharField(max_length=10, unique=True, blank=False, null=False)
    email: str = models.EmailField()

    def __str__(self) -> str:
        return f"{self.name} - {self.crm}"
