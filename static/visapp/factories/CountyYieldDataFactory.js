(function() {
    'use strict';

    visApp.factory('CountyYieldDataFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('/api/yield-data/state/:statefp/county/:countyfp/crop/:crop/start-year/:start_year/end-year/:end_year/');

    }])
})();
