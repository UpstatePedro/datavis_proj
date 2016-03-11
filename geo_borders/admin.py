from django.contrib.gis import admin

from .models import UsCountyBorder


admin.site.register(UsCountyBorder, admin.OSMGeoAdmin)