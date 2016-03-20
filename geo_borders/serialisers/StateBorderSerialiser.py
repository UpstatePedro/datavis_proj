from rest_framework_gis.serializers import GeoFeatureModelSerializer

from geo_borders.models import UsStateBorder


class StateBorderSerialiser(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = UsStateBorder
        fields = ('name', 'statefp')
        geo_field = 'geom'

