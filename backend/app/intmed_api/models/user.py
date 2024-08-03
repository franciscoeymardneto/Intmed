from django.db import models


class User(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=100)
    email: str = models.EmailField(unique=True)
    password: str = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name
