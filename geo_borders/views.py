from django.contrib.gis.geos.geometry import GEOSGeometry
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from geo_borders.models import UsCountyBorder, UsStateBorder
from geo_borders.serialisers.CountyBorderListSerialiser import CountyBorderListSerialiser
from geo_borders.serialisers.StateBorderSerialiser import StateBorderSerialiser


def index(request):
    context = {}
    return render(request, '../templates/index.html', context)


def technology_used(request):
    context = {}
    return render(request, '../templates/technology_used.html', context)


class UsCountyBorderList(APIView):
    """
    List all UsCountyBorders
    """

    def get(self, request, format=None):
        county_borders = UsCountyBorder.objects.all()
        serializer = CountyBorderListSerialiser(county_borders, many=True)
        return Response(serializer.data)


class UsCountyBorderListByState(APIView):
    """
    List all UsCountyBorders for a single State
    """

    def get(self, request, state, format=None):
        county_borders = UsCountyBorder.objects.filter(statefp=state)
        serializer = CountyBorderListSerialiser(county_borders, many=True)
        return Response(serializer.data)


class UsStateBorderList(APIView):
    """
    List all UsStateBorders
    """

    def get(self, request, format=None):
        state_borders = UsStateBorder.objects.all()
        serializer = StateBorderSerialiser(state_borders, many=True)
        return Response(serializer.data)


class UsStateBorderDetail(APIView):
    """
    Detail a specific US State border
    """

    def get(self, request, state, format=None):
        state_border = UsStateBorder.objects.filter(statefp=state)
        serializer = StateBorderSerialiser(state_border, many=True)
        return Response(serializer.data)

class StateSearch(APIView):
    """
    List all UsCountyBorders
    """

    def get(self, request, long, lat, format=None):
        point = GEOSGeometry('{ "type": "Point", "coordinates": [ '+long+', '+lat+' ] }')
        state = UsStateBorder.objects.filter(geom__contains=point)
        context = {
            'state_name': state[0].name,
            'statefp': state[0].statefp
        }
        return Response(context)
