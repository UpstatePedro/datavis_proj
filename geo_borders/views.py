from django.contrib.gis.geos.geometry import GEOSGeometry
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from geo_borders.models import UsCountyBorder, UsStateBorder
from geo_borders.serialisers.CountyBorderListSerialiser import CountyBorderListSerialiser
from geo_borders.serialisers.StateBorderSerialiser import StateBorderSerialiser


class UsCountyBorderList(APIView):
    """
    List all UsCountyBorders
    """

    def get(self, request, format=None):
        county_borders = UsCountyBorder.objects.all()
        serializer = CountyBorderListSerialiser(county_borders, many=True)
        return Response(serializer.data)


class UsCountyBorderDetail(APIView):
    """
    List all UsCountyBorders
    """

    def get(self, request, county_code, format=None):
        county_borders = UsCountyBorder.objects.filter(countyfp=county_code)
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


class CountySearch(APIView):
    """
    List all UsCountyBorders that contain a specific coordinates point
    """

    def get(self, request, long, lat, format=None):
        point = GEOSGeometry('{ "type": "Point", "coordinates": [ ' + long + ', ' + lat + ' ] }')
        county = UsCountyBorder.objects.filter(geom__contains=point)
        statefp = county[0].statefp
        state = UsStateBorder.objects.get(statefp=statefp)
        context = {
            'county_name': county[0].name,
            'countyfp': county[0].countyfp,
            'state_name': state.name
        }
        return Response(context)

class CountyNameFromFp(APIView):
    """
    Return the name of a state, given it's FP code
    """
    def get(self, request, statefp, countyfp, format=None):
        try:
            county_name = UsCountyBorder.objects.get(
                statefp=statefp,
                countyfp=countyfp
            ).name
            state_name = UsStateBorder.objects.get(statefp=statefp).name
        except:
            return Response("no state found with fp: %s" % statefp)
        context = {
            'statefp': statefp,
            'countyfp': countyfp,
            'state_name': state_name,
            'county_name': county_name
        }
        return Response(context)

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
    List all UsStateBorders that contain a specific coordinates point
    """

    def get(self, request, long, lat, format=None):
        point = GEOSGeometry('{ "type": "Point", "coordinates": [ ' + long + ', ' + lat + ' ] }')
        state = UsStateBorder.objects.filter(geom__contains=point)
        context = {
            'state_name': state[0].name,
            'statefp': state[0].statefp
        }
        return Response(context)

class StateNameFromFp(APIView):
    """
    Return the name of a state, given it's FP code
    """
    def get(self, request, statefp, format=None):
        try:
            state_name = UsStateBorder.objects.get(statefp=statefp).name
        except:
            return Response("no state found with fp: %s" % statefp)
        context = {
            'statefp': statefp,
            'state_name': state_name
        }
        return Response(context)
