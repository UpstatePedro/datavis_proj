(function() {
    'use strict';

    visApp.factory('StateNameFromFpFactory', [
        '$resource',
    function(
        $resource) {

            return $resource('api/borders/state-from-fp/:statefp');

    }])
})();