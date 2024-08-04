from django.db import models

from .schedule import Schedule


class ScheduleDay(models.Model):
    id: int = models.AutoField(primary_key=True)
    schedule = models.ForeignKey(
        Schedule, on_delete=models.CASCADE, related_name="schedules-hours", null=False
    )
    hour: models.TimeField = models.TimeField()
    isReserved: bool = models.BooleanField(default=False)

    class Meta:
        unique_together = ("schedule", "hour")

    def __str__(self) -> str:
        return self.hour.strftime("%H:%M")
