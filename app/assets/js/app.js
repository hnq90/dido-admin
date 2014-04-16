'use strict';

// Declare app level module which depends on filters, and services
var DidoCP = angular.module('dido', [
    'ngResource',
    'ngRoute',
//    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'ngCookies',
    'chieffancypants.loadingBar',
    'google-maps',
    'localytics.directives',
    'dido.filters',
    'dido.services',
    'dido.directives',
    'dido.controllers'
]) //ROUTES CONFIG
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/others/login_form.html',
            controller: 'AuthenCtrl',
            isFree: true
        }).when('/home', {
            templateUrl: 'views/others/home.html',
            controller: 'DashboardCtrl',
            isFree: false
        }).when('/report', {
            templateUrl: 'views/others/report.html',
            controller: 'ReportCtrl',
            isFree: false
        }).when('/feedback', {
            templateUrl: 'views/others/feedback.html',
            controller: 'FeedbackCtrl',
            isFree: false
        }).when('/user', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl',
            isFree: false
        }).when('/user-detail/:id', {
            templateUrl: 'views/user/edit_user.html',
            controller: 'UserDetailCtrl',
            isFree: false
        }).when('/user-creation/', {
            templateUrl: 'views/user/create_user.html',
            controller: 'UserCreationCtrl',
            isFree: false
        }).when('/user-search/', {
            templateUrl: 'views/user/user.html',
            controller: 'UserSearchCtrl',
            isFree: false
        }).when('/place', {
            templateUrl: 'views/place/place.html',
            controller: 'PlaceCtrl',
            isFree: false
        }).when('/place-detail/:id', {
            templateUrl: 'views/place/edit_place.html',
            controller: 'PlaceDetailCtrl',
            isFree: false
        }).when('/place-creation/', {
            templateUrl: 'views/place/create_place.html',
            controller: 'PlaceCreationCtrl',
            isFree: false
        }).when('/place-search/', {
            templateUrl: 'views/place/place.html',
            controller: 'PlaceSearchCtrl',
            isFree: false
        }).when('/question', {
            templateUrl: 'views/create_user.html',
            controller: 'QuestionCtrl',
            isFree: false
        }).when('/answer', {
            templateUrl: 'views/create_user.html',
            controller: 'AnswerCtrl',
            isFree: false
        }).otherwise({
            redirectTo: '/login'
        });
    }
]).run( function($rootScope, $location, $cookies) {
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if (!next.$$route.isFree && $cookies.logged == true) {
                console.log($cookies.logged);
            } else {
                $location.path('/login');
            }
        });
    });

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