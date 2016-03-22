(function() {
    'use strict';

    visApp.factory('SearchStatesFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/states-search/long/:long/lat/:lat/');

    }])
})();
