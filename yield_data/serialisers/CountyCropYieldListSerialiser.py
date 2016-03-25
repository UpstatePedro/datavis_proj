from rest_framework import serializers

from yield_data.models import CountyCropYield


class CountyCropYieldListSerialiser(serializers.ModelSerializer):
    """ A class to serialize County-level crop yield data for a particular State """
    value = serializers.SerializerMethodField('get_yield_value')

    class Meta:
        model = CountyCropYield
        fields = ('year', 'crop_name', 'region_name', 'yield_value', 'value', 'yield_unit')

    def get_yield_value(self, obj):
        return obj.yield_value