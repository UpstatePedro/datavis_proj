(function() {
    'use strict';

    visApp.controller('CountiesMapController', [
        '$scope',
        '$location',
        '$routeParams',
        'StateCountiesBoundariesFactory',
        'AllCountiesBoundariesFactory',
        'D3DrawChoroplethFactory',
    function(
        $scope,
        $location,
        $routeParams,
        StateCountiesBoundariesFactory,
        AllCountiesBoundariesFactory,
        D3DrawChoroplethFactory
    ) {

        $scope.statefp = $routeParams.statefp
        console.log("statefp");
        console.log($scope.statefp);

        $scope.state_county_boundaries = null

        StateCountiesBoundariesFactory.get({state: $scope.statefp}, function(success) {
            $scope.state_county_boundaries = success;
            D3DrawChoroplethFactory.state_choropleth($scope.state_county_boundaries);
        })

    }])

})();

