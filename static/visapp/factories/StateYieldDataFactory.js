(function() {
    'use strict';

    visApp.factory('StateYieldDataFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('/api/yield-data/state/:statefp/crop/:crop/start-year/:start_year/end-year/:end_year/');

    }])
})();
