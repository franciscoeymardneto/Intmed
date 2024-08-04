from django.contrib.auth.models import User
from rest_framework import serializers


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model: User
        fields = ("username", "email", "password", "password2")

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError(
                "Senhas não conferem. \
                Por favor digite senhas iguais."
            )
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.is_staff = True
        user.is_superuser = False
        user.save()
        return user
