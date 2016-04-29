(function() {
    'use strict';

    visApp.factory('StateCountiesYieldDataFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/yield-data/counties/state/:state_fp/start-year/:start_year/end-year/:end_year/crop/:crop_name/');

    }])
})();