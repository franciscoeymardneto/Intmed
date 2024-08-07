from django.contrib import admin

from .models import Doctor, Schedule, ScheduleHour

admin.site.register(Doctor)
admin.site.register(ScheduleHour)
admin.site.register(Schedule)
