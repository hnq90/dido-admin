'use strict';

/* Filters */

angular.module('dido.filters', []).
filter('interpolate', ['version',
    function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }
]);