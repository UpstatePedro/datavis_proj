(function() {
    'use strict';

    visApp.factory('SearchCountiesFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/borders/counties-search/long/:long/lat/:lat/');

    }])
})();
