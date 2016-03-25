(function() {
    'use strict';

    visApp.controller('StatesMapController', [
        '$scope',
        '$location',
        'StateBoundariesFactory',
        'AllStatesYieldDataFactory',
        'D3DrawChoroplethFactory',
        'CornYieldDataFactory',
    function(
        $scope,
        $location,
        StateBoundariesFactory,
        AllStatesYieldDataFactory,
        D3DrawChoroplethFactory,
        CornYieldDataFactory
    ) {

        $scope.filterYear = 2012;
        $scope.cropData = AllStatesYieldDataFactory.query({
            start_year: $scope.filterYear,
            end_year: $scope.filterYear,
            crop_name: 'corn'
        }, function(success) {
            console.log("Success - all states yield data factory")
            console.log(success);
        }, function(error) {
            console.log("Error - all states yield data factory")
            console.log(error);
        });
        $scope.cornData = CornYieldDataFactory.corn()
        $scope.filteredCornData = $scope.cornData.filter(extractAnnualData)
        console.log("$scope.filteredCornData");
        console.log($scope.filteredCornData);

        $scope.state_boundaries = null

        StateBoundariesFactory.get(function(success) {
            $scope.state_boundaries = success;
            D3DrawChoroplethFactory.state_choropleth($scope.state_boundaries, $scope.cropData, "state");
        })

        function extractAnnualData(obj) {
            return obj.year === $scope.filterYear
        }

    }])

})();
