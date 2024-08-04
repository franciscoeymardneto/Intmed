from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import UserRegistrationSerializer


@api_view(["POST"])
def createUser(request):
    """
    Cria um novo usuário com acesso ao admin, mas sem privilégios de superadmin.

    Exemplo de corpo da solicitação:
    {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "password123",
        "password2": "password123"
    }
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
