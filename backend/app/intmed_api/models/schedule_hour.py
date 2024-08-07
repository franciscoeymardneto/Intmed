from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

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

    def NoSaveScheduleWithPassHour(self):
        current_datetime = timezone.localtime(timezone.now())
        if self.schedule.day < current_datetime.date() or (self.schedule.day == current_datetime.date() and self.hour.hour < current_datetime.time().hour):
            raise ValidationError(
                f"Não é possível adicionar um horário passado à agenda. {self.hour} - {current_datetime.time()}",
                code="invalid"
            )

    def save(self, *args, **kwargs):
        self.NoSaveScheduleWithPassHour()
        super().save(*args, **kwargs)
    def __str__(self) -> str:
        return f"{self.schedule.__str__()} - {self.hour.strftime("%H:%M")}"
