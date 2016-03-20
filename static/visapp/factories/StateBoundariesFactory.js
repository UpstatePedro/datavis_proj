(function() {
    'use strict';

    visApp.factory('StateBoundariesFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/states/');

    }])
})();
