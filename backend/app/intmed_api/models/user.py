from django.db import models


class User(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=100, blank=False, null=False)
    email: str = models.EmailField(unique=True, blank=False, null=False)
    password: str = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self) -> str:
        return self.name
