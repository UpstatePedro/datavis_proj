from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from geo_borders.models import UsCountyBorder
from geo_borders.serialisers.CountyBorderListSerialiser import CountyBorderListSerialiser


def index(request):
    context = {}
    return render(request, '../templates/index.html', context)

class CountyBorderList(APIView):
    """
    List all CountyBorders
    """
    def get(self, request, format=None):
        county_borders = UsCountyBorder.objects.all()
        serializer = CountyBorderListSerialiser(county_borders, many=True)
        return Response(serializer.data)

class CountyBorderListByState(APIView):
    """
    List all CountyBorders
    """
    def get(self, request, state, format=None):
        county_borders = UsCountyBorder.objects.filter(statefp=state)
        serializer = CountyBorderListSerialiser(county_borders, many=True)
        return Response(serializer.data)