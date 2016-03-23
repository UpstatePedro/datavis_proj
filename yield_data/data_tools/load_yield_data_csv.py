import csv
import string

from geo_borders.models import UsStateBorder, UsCountyBorder
from yield_data.models import StateCropYield, CountyCropYield

file_name = '../data/yield_data.csv'


def find_state_border(state_name):
    state_name = string.capwords(state_name)
    try:
        border_obj = UsStateBorder.objects.get(name=state_name)
        return border_obj
    except:
        return None


def find_county_border(county_name):
    county_name = string.capwords(county_name)
    try:
        border_obj = UsCountyBorder.objects.get(name=county_name)
        return border_obj
    except:
        return None

def extract_state_data(data_obj):
    scy = StateCropYield(
        year=data_obj.get('year'),
        crop_name=data_obj.get('commodity_desc'),
        region_name=data_obj.get('state_name'),
        region_category=data_obj.get('agg_level_desc'),
        yield_value=data_obj.get('value'),
        yield_unit=data_obj.get('unit_desc'),
        state_fips_code=data_obj.get('state_fips_code'),
        state_boundary_ref=find_state_border(data_obj.get('state_name'))
    )
    print scy


def extract_county_data(data_obj):
    ccy = CountyCropYield(
        year=data_obj.get('year'),
        crop_name=data_obj.get('commodity_desc'),
        region_name=data_obj.get('county_name'),
        region_category=data_obj.get('agg_level_desc'),
        yield_value=data_obj.get('value'),
        yield_unit=data_obj.get('unit_desc'),
        county_code=data_obj.get('county_code'),
        state_boundary_ref=find_county_border(data_obj.get('county_name'))
    )
    print ccy


with open(file_name) as csv_file:
    reader = csv.DictReader(csv_file, fieldnames=['year',
                                                  'agg_level_desc',
                                                  'state_name',
                                                  'state_fips_code',
                                                  'county_name',
                                                  'county_code',
                                                  'commodity_desc',
                                                  'value',
                                                  'unit_desc'
                                                  ])
    for data_row in reader:
        if data_row.get('agg_level_desc') == "COUNTY":
            extract_county_data(data_row)
        else:
            extract_state_data(data_row)
