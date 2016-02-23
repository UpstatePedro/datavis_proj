from django.contrib.gis import admin
.models import CountyBorder

admin.site.register(CountyBorder, admin.GeoModelAdmin)
