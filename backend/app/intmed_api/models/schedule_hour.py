from django.contrib.auth.models import User
from django.db import models

from .schedule import Schedule


class ScheduleHour(models.Model):
    id: int = models.AutoField(primary_key=True)
    schedule = models.ForeignKey(
        Schedule, on_delete=models.CASCADE, related_name="schedules_hours", null=False
    )
    hour: models.TimeField = models.TimeField()
    isReserved: bool = models.BooleanField(default=False)
    client = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_consult", null=True
    )

    class Meta:
        unique_together = ("schedule", "hour")

    def __str__(self) -> str:
        return self.hour.strftime("%H:%M")
