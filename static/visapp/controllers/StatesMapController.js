(function() {
    'use strict';

    visApp.controller('StatesMapController', [
        '$scope',
        '$rootScope',
        '$location',
        '$window',
        'StateBoundariesFactory',
        'AllStatesYieldDataFactory',
        'D3DrawChoroplethFactory',
        'AvailableYieldYearsFactory',
    function(
        $scope,
        $rootScope,
        $location,
        $window,
        StateBoundariesFactory,
        AllStatesYieldDataFactory,
        D3DrawChoroplethFactory,
        AvailableYieldYearsFactory
    ) {

        getScreenDimensions($scope, $rootScope, $window);
        getYears($scope, $rootScope);
        $scope.showSelections = true;
        $scope.state_boundaries = null;
        $scope.cropData = {};
        $scope.crop_name = 'corn';
        $scope.filterYear = '2000';

        refreshPage($scope.filterYear, $scope.crop_name, $scope.state_boundaries, $scope.cropData, $scope.screen)
        $scope.refreshPage = refreshPage

        function updateData(year, crop, data) {
            data = AllStatesYieldDataFactory.query({
                start_year: year,
                end_year: year,
                crop_name: crop
            }, function(success) {
            }, function(error) {
            });
            return data;
        }

        function drawChart(state_boundaries, cropData, year, crop, region_type, screen) {
            StateBoundariesFactory.get(function(success) {
                state_boundaries = success;
                D3DrawChoroplethFactory.state_choropleth(state_boundaries, cropData, year, crop, region_type, 'n/a', screen);
            })
        }

        function refreshPage(year, crop, boundaries, data, screen) {
            data = updateData(year, crop, data)
            drawChart(boundaries, data, year, crop, "state", screen)
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

        function getScreenDimensions(scope, rootScope, window) {
            if (rootScope.hasOwnProperty('screen')) {
                scope.screen = rootScope.screen;
            } else {
                rootScope.screen = {};
                rootScope.screen.height = window.screen.height;
                rootScope.screen.width = window.screen.width;
            }
            ;
        }
    }])

})();
