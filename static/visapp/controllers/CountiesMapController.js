(function() {
    'use strict';

    visApp.controller('CountiesMapController', [
        '$scope',
        '$location',
        'StateCountiesBoundariesFactory',
        'D3DrawChoroplethFactory',
    function(
        $scope,
        $location,
        StateCountiesBoundariesFactory,
        D3DrawChoroplethFactory
    ) {

        $scope.state_county_boundaries = null

        StateCountiesBoundariesFactory.get({state: '01'}, function(success) {
            D3DrawChoroplethFactory.state_choropleth($scope.state_county_boundaries);
        })

    }])

})();

