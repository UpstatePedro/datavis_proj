from django.contrib.gis import admin

from us_counties.models.CountyBorder import CountyBorder

admin.site.register(CountyBorder, admin.OSMGeoAdmin)
