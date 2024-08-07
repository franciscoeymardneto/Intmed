from django.contrib import admin

from .models import Doctor, Schedule, ScheduleHour, Speciality

admin.site.register(Doctor)
admin.site.register(ScheduleHour)
admin.site.register(Schedule)
admin.site.register(Speciality)
