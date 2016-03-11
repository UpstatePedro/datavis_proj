(function() {
    'use strict';

    visApp.factory('AllCountiesBoundariesFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/county-borders');

    }])
})();
