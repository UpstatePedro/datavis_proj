from django.contrib.gis import admin

from geo_borders.models import UsStateBorder
from .models import UsCountyBorder


admin.site.register(UsCountyBorder, admin.OSMGeoAdmin)
admin.site.register(UsStateBorder, admin.OSMGeoAdmin)