(function() {
    'use strict';

    visApp.factory('StateCountiesBoundariesFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/state/:state/county-borders');

    }])
})();