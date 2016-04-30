(function() {
    'use strict';

    visApp.controller('CountiesMapController', [
        '$scope',
        '$rootScope',
        '$location',
        '$window',
        '$routeParams',
        'StateCountiesBoundariesFactory',
        'AllCountiesBoundariesFactory',
        'StateCountiesYieldDataFactory',
        'AvailableYieldYearsFactory',
        'D3DrawChoroplethFactory',
        'StateNameFromFpFactory',
    function(
        $scope,
        $rootScope,
        $location,
        $window,
        $routeParams,
        StateCountiesBoundariesFactory,
        AllCountiesBoundariesFactory,
        StateCountiesYieldDataFactory,
        AvailableYieldYearsFactory,
        D3DrawChoroplethFactory,
        StateNameFromFpFactory
    ) {

        getScreenDimensions($scope, $rootScope, $window);
        getYears($scope, $rootScope);
        $scope.statefp = $routeParams.statefp;
        getStateName($scope)
        $scope.filterYear = $routeParams.year;
        $scope.crop_name = $routeParams.crop;
        $scope.state_county_boundaries = null;
        $scope.cropData = {};

        refreshPage($scope.filterYear, $scope.crop_name, $scope.statefp, $scope.state_boundaries, $scope.cropData, $scope.statefp, $scope.screen)
        $scope.refreshPage = refreshPage

        function updateData(year, crop, state, data) {
            data = StateCountiesYieldDataFactory.query({
                start_year: year,
                end_year: year,
                state_fp: state,
                crop_name: crop
            }, function(success) {
                var result_length = success.length;
                var result = success.slice(0,result_length);
                return result
            }, function(error) {
            });
            return data;
        }

        function drawChart(state, state_county_boundaries, cropData, year, crop, region_type, statefp, screen) {
            StateCountiesBoundariesFactory.get({state: state}, function(success) {
                state_county_boundaries = success;
                D3DrawChoroplethFactory.state_choropleth(state_county_boundaries, cropData, year, crop, region_type, statefp, screen);
            })
        }

        function refreshPage(year, crop, state, boundaries, data, statefp, screen) {
            data = updateData(year, crop, state, data)
            drawChart(state, boundaries, data, year, crop, "county", statefp, screen)
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

        function getStateName(scope) {
            StateNameFromFpFactory.get({statefp: scope.statefp}, function(success) {
                scope.state_name = success.state_name

            }, function(error) {
                console.log(error)
            })
        }

        function getScreenDimensions(scope, rootScope, window) {
            if (rootScope.hasOwnProperty('screen')) {
                scope.screen = rootScope.screen;
            } else {
                rootScope.screen = {};
                rootScope.screen.height = window.screen.height;
                rootScope.screen.width = window.screen.width;
                scope.screen = rootScope.screen;
            };
        }

    }])

})();
