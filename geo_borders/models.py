from __future__ import unicode_literals

from django.contrib.gis.db import models


class UsCountyBorder(models.Model):
    statefp = models.CharField(max_length=2)
    countyfp = models.CharField(max_length=3)
    countyns = models.CharField(max_length=8)
    affgeoid = models.CharField(max_length=14)
    geoid = models.CharField(max_length=5)
    name = models.CharField(max_length=100)
    lsad = models.CharField(max_length=2)
    aland = models.FloatField()
    awater = models.FloatField()
    geom = models.MultiPolygonField(srid=4269)

    def __unicode__(self):
        return self.name
