from __future__ import unicode_literals

from django.db import models

from geo_borders.models import UsStateBorder, UsCountyBorder


class AbstractCropYield(models.Model):
    year = models.IntegerField(blank=False)
    crop_name = models.CharField(blank=False, max_length=20)
    region_name = models.CharField(blank=False, max_length=50)
    region_category = models.CharField(blank=False, max_length=50)
    yield_value = models.FloatField(blank=False)
    yield_unit = models.CharField(blank=False, max_length=50)

    class Meta:
        abstract = True

    def __unicode__(self):
        return "%s - %s (%s): %f (%s)" % (self.year, self.region_name, self.region_category, self.yield_value, self.yield_unit)


class StateCropYield(AbstractCropYield):
    state_fips_code = models.IntegerField()
    state_boundary_ref = models.ForeignKey(UsStateBorder)


class CountyCropYield(AbstractCropYield):
    county_code = models.IntegerField()
    county_boundary_ref = models.ForeignKey(UsCountyBorder)
    state_fips_code = models.IntegerField()

