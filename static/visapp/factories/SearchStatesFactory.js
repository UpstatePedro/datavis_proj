(function() {
    'use strict';

    visApp.factory('SearchStatesFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/borders/states-search/long/:long/lat/:lat/');

    }])
})();
