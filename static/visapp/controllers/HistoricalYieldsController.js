(function() {
    'use strict';

    visApp.controller('HistoricalYieldsController', [
        '$scope',
        '$location',
        'SoyYieldDataFactory',
        'CornYieldDataFactory',
        'WheatYieldDataFactory',
        'D3chart',
    function(
        $scope,
        $location,
        SoyYieldDataFactory,
        CornYieldDataFactory,
        WheatYieldDataFactory,
        D3chart
    ) {

        $scope.crop = "soybean"
        $scope.soyData = SoyYieldDataFactory.soy()
        $scope.cornData = CornYieldDataFactory.corn()
        $scope.wheatData = WheatYieldDataFactory.wheat()



        $scope.drawChart = function() {
            if($scope.crop === 'soybean'){
                console.log($scope.soyData)
                var chartData = Object.assign([], $scope.soyData);
                console.log(chartData);
                D3chart.render(chartData);
                console.log($scope.soyData)
            }else if($scope.crop === 'corn'){
                D3chart.render($scope.cornData);
            }else if($scope.crop === 'wheat'){
                D3chart.render($scope.wheatData);
            }
        }



    }])

})();


