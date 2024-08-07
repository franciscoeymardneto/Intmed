from datetime import date

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from .doctor import Doctor


class Schedule(models.Model):
    id: int = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name="schedules", null=False, verbose_name="Médico"
    )
    day: date = models.DateField(verbose_name="Dia")

    class Meta:
        unique_together = ("doctor", "day")
        verbose_name = "Agenda"
        verbose_name_plural = "Agendas"

    def NoSaveScheduleWithPassDate(self):
        if self.day < timezone.localtime(timezone.now()).date():
            raise ValidationError(
                f"Não é possível criar uma agenda para um dia passado.",
                code="invalid"
            )

    def save(self, *args, **kwargs):
        self.NoSaveScheduleWithPassDate()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.doctor.name} - {self.day.strftime("%d/%m/%Y")}"
