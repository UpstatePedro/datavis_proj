from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from geo_borders.models import UsCountyBorder, UsStateBorder
from geo_borders.serialisers.CountyBorderListSerialiser import CountyBorderListSerialiser
from geo_borders.serialisers.StateBorderSerialiser import StateBorderSerialiser


def index(request):
    context = {}
    return render(request, '../templates/index.html', context)


class UsCountyBorderList(APIView):
    """
    List all UsCountyBorders
    """

    def get(self, request, format=None):
        return Response(serializer.data)


