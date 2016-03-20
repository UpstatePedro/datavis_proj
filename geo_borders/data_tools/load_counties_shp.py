import os

from django.contrib.gis.gdal.srs import SpatialReference
from django.contrib.gis.utils import LayerMapping

from geo_borders.models import UsCountyBorder

uscountyborder_mapping = {
    'statefp' : 'STATEFP',
    'countyfp' : 'COUNTYFP',
    'countyns' : 'COUNTYNS',
    'affgeoid' : 'AFFGEOID',
    'geoid' : 'GEOID',
    'name' : 'NAME',
    'lsad' : 'LSAD',
    'aland' : 'ALAND',
    'awater' : 'AWATER',
    'geom' : 'MULTIPOLYGON25D',
}

county_shp = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                          '../data/us_county_borders_20m',
                                          'cb_2014_us_county_20m.shp'))

nad83 = SpatialReference('NAD83')

def run(verbose=True):
    lm = LayerMapping(UsCountyBorder, county_shp, uscountyborder_mapping, source_srs=nad83, encoding='iso-8859-1')
    lm.save(strict=True, verbose=verbose)