from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from geo_borders import views

app_name = 'geo_borders'
urlpatterns = [
    url(r'^county-borders/$', views.UsCountyBorderList.as_view()),
    url(r'^county-borders/(?P<county_code>[0-9]+)/$', views.UsCountyBorderDetail.as_view()),
    url(r'^state/(?P<state>[0-9]+)/county-borders/$', views.UsCountyBorderListByState.as_view()),
    url(r'^states/$', views.UsStateBorderList.as_view()),
    url(r'^states/(?P<state>[0-9]+)/$', views.UsStateBorderDetail.as_view()),
    url(r'^states-search/long/(?P<long>-*[0-9]+\.[0-9]+)/lat/(?P<lat>-*[0-9]+\.[0-9]+)/$', views.StateSearch.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
