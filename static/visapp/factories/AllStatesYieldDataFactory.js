(function() {
    'use strict';

    visApp.factory('AllStatesYieldDataFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/yield-data/all-states/start-year/:start_year/end-year/:end_year/crop/:crop_name/');

    }])
})();