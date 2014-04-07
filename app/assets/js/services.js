'use strict';

/* Services */
var dido_api = angular.module('dido.services', ['ngResource']);
//GET DATA FROM API
var dido_headers = {
        'X-Dido-Client-Version': 'v1.0',
        'X-Dido-Client-Type': 'Android',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    base_url = 'http://dido.energeeks.com',
    dashboard_info = '/api/admin/dashboard_info';

dido_api.factory('DashboardInfo', ['$resource',
    function ($resource) {
        return $resource(base_url + dashboard_info, {}, {
            get: {
                method: 'GET',
                headers: dido_headers
            }
        });
    }]);