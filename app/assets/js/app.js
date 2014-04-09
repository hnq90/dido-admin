'use strict';


// Declare app level module which depends on filters, and services
var DidoCP = angular.module('dido', [
    'ngResource',
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
            controller: 'DashboardCtrl'
        }).when('/report', {
            templateUrl: 'partials/partial2.html',
            controller: 'ReportCtrl'
        }).when('/feedback', {
            templateUrl: 'partials/partial2.html',
            controller: 'FeedbackCtrl'
        }).when('/user', {
            templateUrl: 'partials/user.html',
            controller: 'UserCtrl'
        }).when('/place', {
            templateUrl: 'partials/partial2.html',
            controller: 'PlaceCtrl'
        }).when('/question', {
            templateUrl: 'partials/partial2.html',
            controller: 'QuestionCtrl'
        }).when('/answer', {
            templateUrl: 'partials/partial2.html',
            controller: 'AnswerCtrl'
        }).otherwise({
            redirectTo: '/home'
        });
    }
]);