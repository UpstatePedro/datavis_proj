(function() {
    'use strict';

    visApp.controller('CountiesMapController', [
        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'StateCountiesBoundariesFactory',
        'AllCountiesBoundariesFactory',
        'StateCountiesYieldDataFactory',
        'AvailableYieldYearsFactory',
        'D3DrawChoroplethFactory',
    function(
        $scope,
        $rootScope,
        $location,
        $routeParams,
        StateCountiesBoundariesFactory,
        AllCountiesBoundariesFactory,
        StateCountiesYieldDataFactory,
        AvailableYieldYearsFactory,
        D3DrawChoroplethFactory
    ) {
        getYears($scope, $rootScope);
        $scope.statefp = $routeParams.statefp;
        $scope.filterYear = $routeParams.year;
        $scope.crop_name = $routeParams.crop;
        $scope.state_county_boundaries = null;
        $scope.cropData = {};

        function updateData(year, crop, state, data) {
            data = StateCountiesYieldDataFactory.query({
                start_year: year,
                end_year: year,
                state_fp: state,
                crop_name: crop
            }, function(success) {
            }, function(error) {
            });
            return data;
        }

        function drawChart(state, state_county_boundaries, cropData, year, crop, region_type) {
            StateCountiesBoundariesFactory.get({state: state}, function(success) {
                state_county_boundaries = success;
                D3DrawChoroplethFactory.state_choropleth(state_county_boundaries, cropData, year, crop, region_type);
            })
        }

        function refreshPage(year, crop, state, boundaries, data) {
            data = updateData(year, crop, state, data)
            drawChart(state, boundaries, data, year, crop, "county")
        }

        $scope.refreshPage = refreshPage
        refreshPage($scope.filterYear, $scope.crop_name, $scope.statefp, $scope.state_boundaries, $scope.cropData)

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
