from rest_framework_gis.serializers import GeoFeatureModelSerializer

from geo_borders.models import UsCountyBorder

class CountyBorderListSerialiser(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = UsCountyBorder
        fields = ('name', 'statefp', 'countyfp', 'countyns')
        geo_field = 'geom'

