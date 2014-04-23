'use strict';

/* Filters */

angular.module('dido.filters', []).
    filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    }).
    filter('report_action', function () {
        return function (report_action_id) {
            var report_type = '';
            switch (report_action_id) {
                case 1:
                case 4:
                case 8:
                    report_type = 'Question';
                    break;
                case 2:
                case 3:
                case 5:
                    report_type = 'Place';
                    break;
                case 6:
                case 7:
                    report_type = 'Image';
                    break;
                case 9:
                case 10:
                    report_type = 'User';
                    break;
            }
            return report_type;
        };
    });