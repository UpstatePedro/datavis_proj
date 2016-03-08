from rest_framework_gis.serializers import GeoFeatureModelSerializer

from us_counties.models.CountyBorder import CountyBorder

class CountyBorderListSerialiser(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = CountyBorder
        fields = ('name', 'statefp', 'countyfp', 'countyns')
        geo_field = 'geom'

