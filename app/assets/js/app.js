'use strict';


// Declare app level module which depends on filters, and services
var DidoCP = angular.module('dido', [
    'ngRoute',
    'dido.filters',
    'dido.services',
    'dido.directives',
    'dido.controllers'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'MyCtrl1'
        }).when('/view2', {
            templateUrl: 'partials/partial2.html',
            controller: 'MyCtrl2'
        }).otherwise({
            redirectTo: '/home'
        });
    }
]);