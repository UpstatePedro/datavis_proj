(function() {
    'use strict';

    visApp.controller('CountiesMapController', [
        '$scope',
        '$location',
        'StateCountiesBoundariesFactory',
        'AllCountiesBoundariesFactory',
        'D3DrawChoroplethFactory',
    function(
        $scope,
        $location,
        StateCountiesBoundariesFactory,
        AllCountiesBoundariesFactory,
        D3DrawChoroplethFactory
    ) {

        $scope.state_county_boundaries = null

        StateCountiesBoundariesFactory.get({state: '34'}, function(success) {
            $scope.state_county_boundaries = success;
            D3DrawChoroplethFactory.state_choropleth($scope.state_county_boundaries);
        })

    }])

})();

