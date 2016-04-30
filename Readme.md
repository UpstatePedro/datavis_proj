#Welcome to the repo for my data visualisation project

This project seeks to do several things:

- Use the geodjango framework to implement geospatial analysis in a web-based context
- Use the D3.js visualisation library to produce customised & interactive visualisations of data with Javascript
- Carry out a preliminary investigation into the implementation of TDD best practices when developing visualisations

##Requirements:

1. Postgresql database

2. PostGIS expansion for postgres - enabling the storage, indexing & efficient querying of geospatial data

> Homebrew can handle points 1&2, and their dependencies:

```
$ brew install postgresql
$ brew install postgis
$ brew install gdal
$ brew install libgeoip
```

3. Python 2.7

4. VirtualEnv / VirtualEnvWrapper (optional, but recommended) for managing your python environment