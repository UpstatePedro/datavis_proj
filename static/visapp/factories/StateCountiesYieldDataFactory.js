(function() {
    'use strict';

    visApp.factory('StateCountiesYieldDataFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/yield-data/counties/start-year/:start_year/end-year/:end_year/state/:state_fp/crop/:crop_name/');

    }])
})();