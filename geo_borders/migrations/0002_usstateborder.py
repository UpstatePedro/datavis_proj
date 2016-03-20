# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-03-11 20:32
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geo_borders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsStateBorder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('statefp', models.CharField(max_length=2)),
                ('statens', models.CharField(max_length=8)),
                ('affgeoid', models.CharField(max_length=11)),
                ('geoid', models.CharField(max_length=2)),
                ('stusps', models.CharField(max_length=2)),
                ('name', models.CharField(max_length=100)),
                ('lsad', models.CharField(max_length=2)),
                ('aland', models.FloatField()),
                ('awater', models.FloatField()),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(srid=4269)),
            ],
        ),
    ]
