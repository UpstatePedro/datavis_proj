(function() {
    'use strict';

    visApp.controller('StatesMapController', [
        '$scope',
        '$location',
        'StateBoundariesFactory',
        'D3DrawChoroplethFactory',
        'CornYieldDataFactory',
    function(
        $scope,
        $location,
        StateBoundariesFactory,
        D3DrawChoroplethFactory,
        CornYieldDataFactory
    ) {

        $scope.cornData = CornYieldDataFactory.corn()
        $scope.filterYear = 1980;
        $scope.filteredCornData = $scope.cornData.filter(extractAnnualData)

        $scope.state_boundaries = null

        StateBoundariesFactory.get({state: '34'}, function(success) {
            $scope.state_boundaries = success;
            D3DrawChoroplethFactory.state_choropleth($scope.state_boundaries, $scope.filteredCornData);
            console.log(success)
        })

        function extractAnnualData(obj) {
            return obj.year === $scope.filterYear
        }

    }])

})();
