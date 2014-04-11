'use strict';

// Declare app level module which depends on filters, and services
var DidoCP = angular.module('dido', [
    'ngResource',
    'ngRoute',
//    'ngAnimate',
    'chieffancypants.loadingBar',
    'dido.filters',
    'dido.services',
    'dido.directives',
    'dido.controllers'
]) //ROUTES CONFIG
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/others/home.html',
            controller: 'DashboardCtrl'
        }).when('/report', {
            templateUrl: 'views/others/report.html',
            controller: 'ReportCtrl'
        }).when('/feedback', {
            templateUrl: 'views/others/feedback.html',
            controller: 'FeedbackCtrl'
        }).when('/user', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        }).when('/user-detail/:id', {
            templateUrl: 'views/user/edit_user.html',
            controller: 'UserDetailCtrl'
        }).when('/user-creation/', {
            templateUrl: 'views/user/create_user.html',
            controller: 'UserCreationCtrl'
        }).when('/place', {
            templateUrl: 'views/place/place.html',
            controller: 'PlaceCtrl'
        }).when('/place-detail/:id', {
            templateUrl: 'views/place/edit_place.html',
            controller: 'PlaceDetailCtrl'
        }).when('/place-creation/', {
            templateUrl: 'views/place/create_place.html',
            controller: 'PlaceCreationCtrl'
        }).when('/question', {
            templateUrl: 'views/create_user.html',
            controller: 'QuestionCtrl'
        }).when('/answer', {
            templateUrl: 'views/create_user.html',
            controller: 'AnswerCtrl'
        }).otherwise({
            redirectTo: '/home'
        });
    }
]);