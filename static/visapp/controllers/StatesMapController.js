(function() {
    'use strict';

    visApp.controller('StatesMapController', [
        '$scope',
        '$rootScope',
        '$location',
        'StateBoundariesFactory',
        'AllStatesYieldDataFactory',
        'D3DrawChoroplethFactory',
        'AvailableYieldYearsFactory',
    function(
        $scope,
        $rootScope,
        $location,
        StateBoundariesFactory,
        AllStatesYieldDataFactory,
        D3DrawChoroplethFactory,
        AvailableYieldYearsFactory
    ) {
        $scope.showSelections = true;

        $scope.state_boundaries = null;

        //$scope.yearArray = extractYears($scope.year_range.min, $scope.year_range.max);
        getYears($scope, $rootScope);
        $scope.cropData = {};
        $scope.crop_name = 'corn';
        $scope.filterYear = '2000';

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

        function drawChart(state_boundaries, cropData, year, crop, region_type) {
            StateBoundariesFactory.get(function(success) {
                state_boundaries = success;
                D3DrawChoroplethFactory.state_choropleth(state_boundaries, cropData, year, crop, region_type);
            })
        }

        function refreshPage(year, crop, boundaries, data) {
            data = updateData(year, crop, data)
            drawChart(boundaries, data, year, crop, "state")
        }
        $scope.refreshPage = refreshPage
        refreshPage($scope.filterYear, $scope.crop_name, $scope.state_boundaries, $scope.cropData)

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
