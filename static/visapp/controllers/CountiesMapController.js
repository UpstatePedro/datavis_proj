(function() {
    'use strict';

    visApp.controller('CountiesMapController', [
        '$scope',
        '$location',
        '$routeParams',
        'StateCountiesBoundariesFactory',
        'AllCountiesBoundariesFactory',
        'StateCountiesYieldDataFactory',
        'D3DrawChoroplethFactory',
    function(
        $scope,
        $location,
        $routeParams,
        StateCountiesBoundariesFactory,
        AllCountiesBoundariesFactory,
        StateCountiesYieldDataFactory,
        D3DrawChoroplethFactory
    ) {
        console.log("in the Counties Map Controller");
        $scope.statefp = $routeParams.statefp
        console.log("statefp");
        console.log($scope.statefp);

        $scope.filterYear = 2012;
        $scope.cropData = StateCountiesYieldDataFactory.query({
            start_year: $scope.filterYear,
            end_year: $scope.filterYear,
            state_fp: $scope.statefp,
            crop_name: 'corn'
        }, function(success) {
            console.log("Success - all states yield data factory")
            console.log(success);
        }, function(error) {
            console.log("Error - all states yield data factory")
            console.log(error);
        });

        $scope.state_county_boundaries = null

        StateCountiesBoundariesFactory.get({state: $scope.statefp}, function(success) {
            $scope.state_county_boundaries = success;
            D3DrawChoroplethFactory.state_choropleth($scope.state_county_boundaries, $scope.cropData, "county");
        })

    }])

})();

