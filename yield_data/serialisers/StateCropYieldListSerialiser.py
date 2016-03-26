from rest_framework import serializers

from yield_data.models import StateCropYield


class StateCropYieldListSerialiser(serializers.ModelSerializer):
    """ A class to serialize State-level crop yield data """
    value = serializers.SerializerMethodField('get_yield_value')
    value_unit = serializers.SerializerMethodField('get_yield_unit')


    class Meta:
        model = StateCropYield
        fields = ('year', 'crop_name', 'region_name', 'yield_value', 'value', 'yield_unit', 'value_unit')

    def get_yield_value(self, obj):
        return obj.yield_value

    def get_yield_unit(self, obj):
        return obj.yield_unit
