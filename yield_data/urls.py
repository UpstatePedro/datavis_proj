from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from yield_data import views

app_name = 'yield_data'
urlpatterns = [
    url(r'^available-years/$', views.YieldDataYearsList.as_view()),

    url(r'^counties/year/(?P<year>[0-9]+)/state/(?P<statefp>[0-9]+)/crop/(?P<crop>[\w]+)/$', views.UsStateCountiesCropYieldList.as_view()),
    url(r'^counties/start-year/(?P<start_year>[0-9]+)/end-year/(?P<end_year>[0-9]+)/state/(?P<statefp>[0-9]+)/crop/(?P<crop>[\w]+)/$', views.UsCountiesCropYieldList.as_view()),

    url(r'^all-states/start-year/(?P<start_year>[0-9]+)/end-year/(?P<end_year>[0-9]+)/crop/(?P<crop>[\w]+)/$', views.UsStatesCropYieldList.as_view()),
    url(r'^state/start-year/(?P<start_year>[0-9]+)/end-year/(?P<end_year>[0-9]+)/state/(?P<statefp>[0-9]+)/crop/(?P<crop>[\w]+)/$', views.UsStateCropYieldList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
