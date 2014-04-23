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
//    base_url = 'http://localhost:3000',
    base_url = 'http://dido.energeeks.com',
    dashboard_info = '/api/admin/dashboard_info',
    user_creation_api = '/api/v1/users/',
    user_api = '/api/users/',
    place_api = '/api/places/',
    district_api = '/api/districts/',
    city_api = '/api/cities/',
    cuisine_api = '/api/cuisines/',
    purpose_api = '/api/purposes/',
    category_api = '/api/categories/',
    property_api = '/api/properties/',
    dining_api = '/api/dinings/',
    dish_api = '/api/dishes/',
    report_api = '/api/reports/',
    sign_in_api = 'sign_in',
    check_token_api = '/api/admin_token',
    question_api = '/api/questions/',
    answer_api = '/api/answers/',
    admin_login_api = '/api/super_user/login';

dido_api.factory('LoginAPI', ['$resource',
    function ($resource) {
        return $resource(base_url + admin_login_api, {}, {
            login: {
                method: 'POST',
                headers: dido_headers
            }
        });
    }])
    .factory('TokenAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + check_token_api, {}, {
                check: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('DashboardInfo', ['$resource',
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
    .factory('UserSearchAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + user_api + 'search', {}, {
                query: {
                    method: 'GET',
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
        }])
    .factory('PlaceSearchAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + place_api + 'search', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('DistrictsAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + district_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('CitiesAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + city_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('CuisinesAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + cuisine_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('CategoriesAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + category_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('PurposesAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + purpose_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('PropertiesAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + property_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('DishesAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + dish_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('DiningsAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + dining_api + 'all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('ReportsAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + report_api + 'admin_all', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('SolveReportsAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + report_api + ':id', {}, {
                solve: {
                    method: 'PUT',
                    params: {
                        id: '@id'
                    },
                    headers: dido_headers
                }
            });
        }])
    .factory('QuestionsListAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + question_api + 'list', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('QuestionsDelAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + question_api + ':id', {}, {
                destroy: {
                    method: 'DELETE',
                    params: {
                        id: '@id'
                    },
                    headers: dido_headers
                }
            });
        }])
    .factory('AnswersListAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + answer_api + 'list', {}, {
                query: {
                    method: 'GET',
                    headers: dido_headers
                }
            });
        }])
    .factory('AnswersDelAPI', ['$resource',
        function ($resource) {
            return $resource(base_url + answer_api + 'admin_del', {}, {
                destroy: {
                    method: 'DELETE',
                    headers: dido_headers
                }
            });
        }])
    .factory('CheckAdminPermission', ['$resource',
        function ($resource) {
            return $resource(base_url + answer_api + 'admin_del', {}, {
//                destroy: {
//                    method: 'DELETE',
//                    headers: dido_headers
//                }
            });
        }]);