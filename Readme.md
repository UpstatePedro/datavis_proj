#Welcome to the repo for my data visualisation project

This project seeks to do several things:

- Use the geodjango framework to implement geospatial analysis in a web-based context
- Use the D3.js visualisation library to produce customised & interactive visualisations of data with Javascript
- Carry out a preliminary investigation into the implementation of TDD best practices when developing visualisations

##Requirements:

###Clone this repository to your local system

`$ git clone https://github.com/UpstatePedro/datavis_proj.git`

###Geospatial database

1. Postgresql database

2. PostGIS expansion for postgres - enabling the storage, indexing & efficient querying of geospatial data

> Homebrew can handle points 1&2, and their dependencies:

```
$ brew install postgresql
$ brew install postgis
$ brew install gdal
$ brew install libgeoip
```

###Python + dependencies
1. Python 2.7

2. VirtualEnv / VirtualEnvWrapper (optional, but recommended) for managing your python environment

3. Please install project python dependencies using pip (once virtual environment activated):

From the project root directory:

`$ pip install -r requirements.pip`

##Migrate the data

> Note, this could take a long time - there is a lot of data!

##Run the server

- Django runs on port 8000 by default:

`$ python manage.py runserver`

##Run the tests

- From the project root:
    - Run the testing server: `$ webdriver-manager start`
    - Run the tests: from a different terminal window, `$ protractor static/spec/e2e/conf.js`