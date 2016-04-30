(function () {
    'use strict';

    visApp.controller('VisAppLandingController', [
        '$scope',
        '$rootScope',
        '$location',
        '$window',
        'AvailableYieldYearsFactory',
    function (
        $scope,
        $rootScope,
        $location,
        $window,
        AvailableYieldYearsFactory) {

        $rootScope.screen = {};
        $rootScope.screen.height = $window.screen.height;
        $rootScope.screen.width = $window.screen.width;

        AvailableYieldYearsFactory.get(function (success) {
            $rootScope.year_range = {}
            $rootScope.year_range.min = success.min.year__min;
            $rootScope.year_range.max = success.max.year__max;
        }, function(error) {
            $rootScope.year_range = {}
            $rootScope.year_range.min = 1990;
            $rootScope.year_range.max = 2015;
        });

    }])

})();

