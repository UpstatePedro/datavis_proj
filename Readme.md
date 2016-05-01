#Welcome to the repo for my data visualisation project

This project seeks to do several things:

- Use the geodjango framework to implement geospatial analysis in a web-based context
- Use the D3.js visualisation library to produce customised & interactive visualisations of data with Javascript
- Carry out a preliminary investigation into the implementation of TDD best practices when developing visualisations

##Requirements:

###Clone this repository to your local system

`$ git clone https://github.com/UpstatePedro/datavis_proj.git`

###Geospatial database

1. Postgresql database manager

2. PostGIS expansion for postgres - enabling the storage, indexing & efficient querying of geospatial data

> Homebrew can handle points 1&2, and their dependencies:

```
$ brew install postgresql
$ brew install postgis
$ brew install gdal
$ brew install libgeoip
```

- This project expects the existence of two (empty) databases:
    - **datavis_proj**
    - **datavis_proj_test**
- These can be created using the `$ createdb dbName` command

- The postGIS extension can be activated for each DB with:

```
$ psql dbName
> CREATE EXTENSION postgis;
> \q
```

###Python + dependencies
1. Python 2.7

2. [Pip python package manager](https://pip.pypa.io/en/stable/installing/)

3. VirtualEnv / [VirtualEnvWrapper](http://virtualenvwrapper.readthedocs.io/en/latest/) (optional, but recommended) for managing your python environment

```
#Create a new virtual environment
$ mkvirtualenv envName

# Work on the new virtual environment
$ workon envName
```

4. Please install project python dependencies using pip (once virtual environment activated):

From the project root directory:

`$ pip install -r requirements.pip`

##Migrate the data

```
# From project root, in virtual env

# Create migrations & DB tables
$ python manage.py makemigrations
$ python manage.py migrate
```

##Load data into the DB

> Note, this could take a long time - there is a lot of data!

```
# From project root

# Open the django shell
$ python manage.py shell

> from geo_borders.data_tools import load_counties_shp
> from geo_borders.data_tools import load_states_shp
> load_counties_shp.run()
........
data will be processed & saved
........

> load_states_shp.run()
........
data will be processed & saved
........
```

##Javascript dependencies & testing

1. [Install Node.js & npm package manager](https://nodejs.org/en/download/)

- Having installed node, update the package manager:
    - `$ (sudo) npm install npm -g`

2. Install [Protractor](http://angular.github.io/protractor/#/) (testing) & update the webdriver

```
$ npm install -g protractor
$ webdriver-manager update
```

There is a chance you will also need to [install jasmine](https://github.com/jasmine/jasmine-npm). Please try this is tests fail to run...

##Run the server

- Django runs on port 8000 by default (so point your browser at localhost:8000):

`$ python manage.py runserver`

##Run the tests

- From the project root:
    - Run the testing server: `$ webdriver-manager start`
    - Run the tests: from a different terminal window, `$ protractor static/spec/e2e/conf.js`