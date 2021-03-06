(function() {
    'use strict';

    visApp.controller('HistoricalCountyChartController', [
        '$scope',
        '$rootScope',
        '$location',
        '$window',
        '$routeParams',
        'CountyYieldDataFactory',
        'AllStatesYieldDataFactory',
        'AvailableYieldYearsFactory',
        'HistoricalChartFactory',
        'CountyNameFromFpFactory',
    function(
        $scope,
        $rootScope,
        $location,
        $window,
        $routeParams,
        CountyYieldDataFactory,
        AllStatesYieldDataFactory,
        AvailableYieldYearsFactory,
        HistoricalChartFactory,
        CountyNameFromFpFactory
    ) {

        getScreenDimensions($scope, $rootScope, $window)
        getYears($scope, $rootScope);
        $scope.countyfp = $routeParams.countyfp;
        $scope.statefp = $routeParams.statefp;
        getCountyName($scope)
        $scope.crop_name = $routeParams.crop;
        $scope.filterStartYear = '2000';
        $scope.filterEndYear = '2014';
        $scope.chartData = null;

        getYieldData($scope.statefp, $scope.countyfp, $scope.crop_name, $scope.filterStartYear, $scope.filterEndYear, $scope.chartData, $scope.screen);
        $scope.updateChart = getYieldData;

        function drawHistoricalChart(chartData, screen) {
            HistoricalChartFactory.historical_chart(chartData, screen);
        }

        function getYieldData(statefp, countyfp, crop, start_year, end_year, chartData, screen) {
            CountyYieldDataFactory.query(
                {
                    statefp: statefp,
                    countyfp: countyfp,
                    crop: crop,
                    start_year: start_year,
                    end_year: end_year
                }, function(success) {
                    var result_length = success.length;
                    chartData = success.slice(0, result_length);
                    drawHistoricalChart(chartData, screen)
                }, function(error) {
                    console.log(error);
                }
            )
        }

        function extractYears(min, max) {
            var yearArray = [];
            for(var yr = min; yr < max; yr++) {
                yearArray.push(
                    yr.toString()
                )
            }
            return yearArray;
        }

        function getCountyName(scope) {
            CountyNameFromFpFactory.get({statefp: scope.statefp, countyfp: scope.countyfp}, function(success) {
                scope.state_name = success.state_name
                scope.county_name = success.county_name
            }, function(error) {
                console.log(error)
            })
        }

        function getYears(scope, rootScope) {
            if (rootScope.hasOwnProperty('year_range')) {
                scope.year_range = rootScope.year_range
                scope.yearArray = extractYears(scope.year_range.min, scope.year_range.max);
            } else {
                AvailableYieldYearsFactory.get(function (success) {
                    scope.year_range = {}
                    scope.year_range.min = success.min.year__min;
                    scope.year_range.max = success.max.year__max;
                    scope.yearArray = extractYears(scope.year_range.min, scope.year_range.max);
                }, function(error) {
                    scope.year_range = {}
                    scope.year_range.min = 1990;
                    scope.year_range.max = 2015;
                    scope.yearArray = extractYears(scope.year_range.min, scope.year_range.max);
                });
            }
        }

        function getScreenDimensions(scope, rootScope, window) {
            if (rootScope.hasOwnProperty('screen')) {
                scope.screen = rootScope.screen;
            } else {
                rootScope.screen = {};
                rootScope.screen.height = window.screen.height;
                rootScope.screen.width = window.screen.width;
            };
        }

    }])

})();
