from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from us_counties.models.CountyBorder import CountyBorder
from us_counties.serialisers.CountyBorderListSerialiser import CountyBorderListSerialiser


def index(request):
    context = {}
    return render(request, 'us_counties/index.html', context)

class CountyBorderList(APIView):
    """
    List all CountyBorders
    """
    def get(self, request, format=None):
        county_borders = CountyBorder.objects.all()
        serializer = CountyBorderListSerialiser(county_borders, many=True)
        return Response(serializer.data)

class CountyBorderListByState(APIView):
    """
    List all CountyBorders
    """
    def get(self, request, state, format=None):
        county_borders = CountyBorder.objects.filter(statefp=state)
        serializer = CountyBorderListSerialiser(county_borders, many=True)
        return Response(serializer.data)