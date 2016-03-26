(function() {
    'use strict';

    visApp.factory('AvailableYieldYearsFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('/api/yield-data/available-years/');

    }])
})();
