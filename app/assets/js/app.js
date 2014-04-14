'use strict';

// Declare app level module which depends on filters, and services
var DidoCP = angular.module('dido', [
    'ngResource',
    'ngRoute',
//    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'chieffancypants.loadingBar',
    'localytics.directives',
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
        }).when('/user-search/', {
            templateUrl: 'views/user/user.html',
            controller: 'UserSearchCtrl'
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

DidoCP.filter('cut', function () {
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
});