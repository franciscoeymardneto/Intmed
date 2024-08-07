from django.contrib.auth.models import User
from django.db import models

from .schedule import Schedule


class ScheduleHour(models.Model):
    id: int = models.AutoField(primary_key=True)
    schedule = models.ForeignKey(
        Schedule, on_delete=models.CASCADE, related_name="schedules_hours", null=False, verbose_name="Agenda"
    )
    hour: models.TimeField = models.TimeField(verbose_name="Horário")
    isReserved: bool = models.BooleanField(default=False)
    client = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_consult", null=True, blank=True, verbose_name="Cliente"
    )

    class Meta:
        unique_together = ("schedule", "hour")
        verbose_name = "Horário da Agenda"
        verbose_name_plural = "Horários da Agenda"

    def __str__(self) -> str:
        return f"{self.schedule.__str__()} - {self.hour.strftime("%H:%M")}"
