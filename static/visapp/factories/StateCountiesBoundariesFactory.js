(function() {
    'use strict';

    visApp.factory('StateCountiesBoundariesFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/borders/state/:state/county-borders/');

    }])
})();