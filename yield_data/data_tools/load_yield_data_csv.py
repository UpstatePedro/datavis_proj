import csv
import string

from geo_borders.models import UsStateBorder, UsCountyBorder
from yield_data.models import StateCropYield, CountyCropYield


def find_state_border(state_name):
    state_name = string.capwords(state_name)
    try:
        border_obj = UsStateBorder.objects.get(name=state_name)
        return border_obj
    except:
        return None


def find_county_border(state_name, county_name):
    state_obj = find_state_border(state_name)
    county_name = county_name.lower()
    try:
        border_obj = UsCountyBorder.objects.get(name=county_name, statefp=state_obj.statefp)
        return border_obj
    except:
        return None


def extract_state_data(data_obj):
    border = find_state_border(data_obj.get('state_name'))
    scy = StateCropYield(
        year=data_obj.get('year'),
        crop_name=data_obj.get('commodity_desc'),
        region_name=data_obj.get('state_name'),
        region_category=data_obj.get('agg_level_desc'),
        yield_value=float(data_obj.get('value')),
        yield_unit=data_obj.get('unit_desc'),
        state_fips_code=data_obj.get('state_fips_code'),
        state_boundary_ref=border
    )
    print scy
    scy.save()


def extract_county_data(data_obj, skipped):
    county_name = data_obj.get('county_name').lower()
    if UsCountyBorder.objects.filter(name=county_name):
        border = find_county_border(data_obj.get('state_name'), county_name)
        if border:
            ccy = CountyCropYield(
                year=data_obj.get('year'),
                crop_name=data_obj.get('commodity_desc'),
                region_name=county_name,
                region_category=data_obj.get('agg_level_desc'),
                yield_value=float(data_obj.get('value')),
                yield_unit=data_obj.get('unit_desc'),
                county_code=data_obj.get('county_code'),
                state_fips_code=data_obj.get('state_fips_code'),
                county_boundary_ref=border
            )
            print ccy
            ccy.save()
        else:
            skipped.append(county_name)
    else:
        skipped.append(county_name)


def run():
    skipped = []
    count = 0
    file_name = 'yield_data/data/additional_yield_data.csv'
    with open(file_name) as csv_file:
        reader = csv.DictReader(csv_file)
        for data_row in reader:
            count += 1
            if data_row.get('agg_level_desc') == "COUNTY":
                extract_county_data(data_row, skipped)
            else:
                extract_state_data(data_row)
    print "%i items" % count
    print "Skipped counties:"
    for i in skipped:
        print i
