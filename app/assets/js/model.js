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
    base_url = 'http://localhost:3000',
    dashboard_info = '/api/admin/dashboard_info',
    user_creation_api = '/api/v1/users/',
    user_api = '/api/users/',
    place_api = '/api/places/';

dido_api.factory('DashboardInfo', ['$resource',
    function ($resource) {
        return $resource(base_url + dashboard_info, {}, {
            get: {
                method: 'GET',
                headers: dido_headers
            }
        });
    }])
    .factory('UserCreationAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + user_creation_api, {}, {
                create: {
                    method: 'POST',
                    headers: dido_headers
                }
            });
        }])
    .factory('UsersAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + user_api + 'all', {}, {
                query: {
                    method: 'GET',
                    params: {
                        per_page: '10'
                    },
                    headers: dido_headers
                }
            });
        }])
    .factory('UserAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + user_api + ':id', {}, {
                show: {
                    method: 'GET',
                    headers: dido_headers
                },
                update: {
                    method: 'PUT',
                    params: {
                        id: '@id'
                    },
                    headers: dido_headers
                },
                delete: {
                    method: 'DELETE',
                    params: {
                        id: '@id'
                    },
                    headers: dido_headers
                }
            })
        }])
    .factory('PlacesAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + place_api, {}, {
                query: {
                    method: 'GET',
                    params: {
                        per_page: '10'
                    },
                    headers: dido_headers
                },
                create: {
                    method: 'POST',
                    headers: dido_headers
                }
            });
        }])
    .factory('PlaceAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + place_api + ':id', {}, {
                show: {
                    method: 'GET',
                    headers: dido_headers
                },
                update: {
                    method: 'PUT',
                    params: {
                        id: '@id'
                    },
                    headers: dido_headers
                },
                delete: {
                    method: 'DELETE',
                    params: {
                        id: '@id'
                    },
                    headers: dido_headers
                }
            })
        }]);