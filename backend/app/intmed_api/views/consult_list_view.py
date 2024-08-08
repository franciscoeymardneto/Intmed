from django.db.models import Q
from django.utils import timezone
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Consult
from ..serializers import ConsultSerializer


@swagger_auto_schema(
    operation_description="Método para listar as consultas. Se clientId for fornecido, lista apenas as consultas daquele cliente. Caso contrário, lista todas as consultas.",
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "clientId",
            openapi.IN_QUERY,
            description="ID do cliente",
            type=openapi.TYPE_INTEGER,
        )
    ],
)
@api_view(["GET"])
def list_consults(request):
    client_id = request.query_params.get("clientId", None)

    now = timezone.localtime(timezone.now())
    today = now.date()
    current_time = now.time()

    if client_id:
        queryset = Consult.objects.filter(
            Q(schedule__day__gte=today, hour__gte=current_time),
            Q(schedule__day__gte=today),
            client__id=client_id,
        ).order_by("schedule__day", "hour")
    else:
        queryset = Consult.objects.filter(
            Q(schedule__day__gte=today, hour__gte=current_time),
            Q(schedule__day__gte=today),
        ).order_by("schedule__day", "hour")

    serializer = ConsultSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
