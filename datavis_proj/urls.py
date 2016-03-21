"""datavis_proj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url
from django.contrib.gis import admin
from rest_framework.urlpatterns import format_suffix_patterns

from geo_borders import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
]

urlpatterns += [
    url(r'^$', views.index, name='index'),
    url(r'^technology/$', views.technology_used, name='technology'),
    url(r'^api/county-borders/$', views.UsCountyBorderList.as_view()),
    url(r'^api/state/(?P<state>[0-9]+)/county-borders/$', views.UsCountyBorderListByState.as_view()),
    url(r'^api/states/$', views.UsStateBorderList.as_view()),
    url(r'^api/states/(?P<state>[0-9]+)/$', views.UsStateBorderDetail.as_view()),
    url(r'^api/states-search/long/(?P<long>-*[0-9]+\.[0-9]+)/lat/(?P<lat>-*[0-9]+\.[0-9]+)/$', views.StateSearch.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
