(function() {
    'use strict';

    visApp.factory('CountyNameFromFpFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/borders/county-from-fp/state/:statefp/county/:countyfp/');

    }])
})();