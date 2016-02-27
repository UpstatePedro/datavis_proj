from rest_framework import serializers

from us_counties.models.CountyBorder import CountyBorder


class CountyBorderListSerialiser(serializers.ModelSerializer):
    class Meta:
        model = CountyBorder
        fields = ('name', 'statefp', 'countyfp', 'countyns')
