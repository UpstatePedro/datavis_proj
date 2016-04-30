(function() {
    'use strict';

    visApp.controller('HistoricalStateChartController', [
        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'StateYieldDataFactory',
        'AllStatesYieldDataFactory',
        'AvailableYieldYearsFactory',
        'HistoricalChartFactory',
    function(
        $scope,
        $rootScope,
        $location,
        $routeParams,
        StateYieldDataFactory,
        AllStatesYieldDataFactory,
        AvailableYieldYearsFactory,
        HistoricalChartFactory
    ) {

        getYears($scope, $rootScope);
        $scope.statefp = $routeParams.statefp;
        $scope.crop_name = $routeParams.crop;
        $scope.filterStartYear = '2000';
        $scope.filterEndYear = '2014';
        $scope.chartData = null;

        getYieldData($scope.statefp, $scope.crop_name, $scope.filterStartYear, $scope.filterEndYear, $scope.chartData);
        $scope.updateChart = getYieldData;

        function drawHistoricalChart(chartData) {
            HistoricalChartFactory.historical_chart(chartData);
        }
        function getYieldData(statefp, crop, start_year, end_year, chartData) {
            console.log("called gYD")
            StateYieldDataFactory.query(
                {
                    statefp: statefp,
                    crop: crop,
                    start_year: start_year,
                    end_year: end_year
                }, function(success) {
                    var result_length = success.length;
                    chartData = success.slice(0, result_length);
                    drawHistoricalChart(chartData)
                }, function(error) {
                    //console.log(error);
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

    }])

})();