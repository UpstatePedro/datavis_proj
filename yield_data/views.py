from django.db.models.aggregates import Min, Max
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from yield_data import API_CROP_DICT
from yield_data.models import CountyCropYield, StateCropYield
from yield_data.serialisers.CountyCropYieldListSerialiser import CountyCropYieldListSerialiser
from yield_data.serialisers.StateCropYieldListSerialiser import StateCropYieldListSerialiser


class UsStateCountiesCropYieldList(APIView):
    """
    List all counties' crop yields for a particular crop, State, year combination
    """

    def get(self, request, year, crop, statefp, format=None):
        year = int(year)
        crop_name = API_CROP_DICT[crop]
        counties_data = CountyCropYield.objects.filter(year=year, crop_name=crop_name, state_fips_code=statefp)
        print "%i items" % len(counties_data)
        serialiser = CountyCropYieldListSerialiser(counties_data, many=True)
        return Response(serialiser.data)


class UsStateCropYieldList(APIView):
    """
    List State crop yields for a particular crop-State-year combination
    """

    def get(self, request, start_year, end_year, crop, statefp, format=None):
        start_year = int(start_year)
        end_year = int(end_year)
        statefp = int(statefp)
        crop_name = API_CROP_DICT[crop]
        state_data = StateCropYield.objects.filter(year__gte=start_year,
                                                   year__lte=end_year,
                                                   crop_name=crop_name,
                                                   state_fips_code=statefp
                                                   )
        serialiser = StateCropYieldListSerialiser(state_data, many=True)
        return Response(serialiser.data)


class UsStatesCropYieldList(APIView):
    """
    List all States' crop yields for a particular crop-year combination
    """

    def get(self, request, start_year, end_year, crop, format=None):
        start_year = int(start_year)
        end_year = int(end_year)
        crop_name = API_CROP_DICT[crop]
        state_data = StateCropYield.objects.filter(year__gte=start_year,
                                                   year__lte=end_year,
                                                   crop_name=crop_name,
                                                   )
        serialiser = StateCropYieldListSerialiser(state_data, many=True)
        return Response(serialiser.data)


class UsCountiesCropYieldList(APIView):
    """
    List member-Counties crop yields for a particular crop-State-year combination
    """

    def get(self, request, start_year, end_year, crop, statefp, format=None):
        start_year = int(start_year)
        end_year = int(end_year)
        statefp = int(statefp)
        crop_name = API_CROP_DICT[crop]
        county_data = CountyCropYield.objects.filter(year__gte=start_year,
                                                     year__lte=end_year,
                                                     crop_name=crop_name,
                                                     state_fips_code=statefp
                                                     )
        serialiser = CountyCropYieldListSerialiser(county_data, many=True)
        return Response(serialiser.data)


class YieldDataYearsList(APIView):
    """
    List member-Counties crop yields for a particular crop-State-year combination
    """

    def get(self, request, format=None):
        min = StateCropYield.objects.aggregate(Min('year'))
        max = StateCropYield.objects.aggregate(Max('year'))
        data_dict = {
            'min': min,
            'max': max
        }
        return Response(data_dict)
