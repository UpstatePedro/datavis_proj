import os

from django.contrib.gis.gdal.srs import SpatialReference
from django.contrib.gis.utils import LayerMapping

from geo_borders.models import UsStateBorder

usstateborder_mapping = {
    'statefp' : 'STATEFP',
    'statens' : 'STATENS',
    'affgeoid' : 'AFFGEOID',
    'geoid' : 'GEOID',
    'stusps' : 'STUSPS',
    'name' : 'NAME',
    'lsad' : 'LSAD',
    'aland' : 'ALAND',
    'awater' : 'AWATER',
    'geom' : 'MULTIPOLYGON25D',
}

state_shp = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                          '../data/us_state_borders_20m',
                                          'cb_2014_us_state_20m.shp'))

nad83 = SpatialReference('NAD83')

def run(verbose=True):
    lm = LayerMapping(UsStateBorder, state_shp, usstateborder_mapping, source_srs=nad83, encoding='iso-8859-1')
    lm.save(strict=True, verbose=verbose)