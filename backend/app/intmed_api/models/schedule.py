from datetime import date

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from .doctor import Doctor


class Schedule(models.Model):
    id: int = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name="schedules", null=False
    )
    day: date = models.DateField()

    class Meta:
        unique_together = ("doctor", "day")

    def NoSaveScheduleWithPassDate(self):
        if self.day < timezone.now().date():
            raise ValidationError(
                "Não é possível criar uma agenda para um dia passado."
            )

    def save(self, *args, **kwargs):
        self.NoSaveScheduleWithPassDate()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.doctor.name} - {self.day}"
