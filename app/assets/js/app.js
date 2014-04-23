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
        $routeProvider.when('/home', {
            templateUrl: 'views/others/home.html',
            controller: 'DashboardCtrl',
            needAuthen: true
        }).when('/report', {
            templateUrl: 'views/others/report.html',
            controller: 'ReportCtrl',
            needAuthen: true
        }).when('/feedback', {
            templateUrl: 'views/others/feedback.html',
            controller: 'FeedbackCtrl',
            needAuthen: true
        }).when('/user', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl',
            needAuthen: true
        }).when('/user-detail/:id', {
            templateUrl: 'views/user/edit_user.html',
            controller: 'UserDetailCtrl',
            needAuthen: true
        }).when('/user-creation/', {
            templateUrl: 'views/user/create_user.html',
            controller: 'UserCreationCtrl',
            needAuthen: true
        }).when('/user-search/', {
            templateUrl: 'views/user/user.html',
            controller: 'UserSearchCtrl',
            needAuthen: true
        }).when('/place', {
            templateUrl: 'views/place/place.html',
            controller: 'PlaceCtrl',
            needAuthen: true
        }).when('/place-detail/:id', {
            templateUrl: 'views/place/edit_place.html',
            controller: 'PlaceDetailCtrl',
            needAuthen: true
        }).when('/place-creation/', {
            templateUrl: 'views/place/create_place.html',
            controller: 'PlaceCreationCtrl',
            needAuthen: true
        }).when('/place-search/', {
            templateUrl: 'views/place/place.html',
            controller: 'PlaceSearchCtrl',
            needAuthen: true
        }).when('/question', {
            templateUrl: 'views/question/question.html',
            controller: 'QuestionCtrl',
            needAuthen: true
        }).when('/answer', {
            templateUrl: 'views/answer/answer.html',
            controller: 'AnswerCtrl',
            needAuthen: true
        }).when('/login', {
            templateUrl: 'views/others/login_form.html',
            controller: 'AuthenCtrl',
            needAuthen: false
        }).when('/logout', {
            templateUrl: 'views/others/login_form.html',
            controller: 'LogoutCtrl',
            needAuthen: false
        }).otherwise({
            redirectTo: '/home'
        });
    }
]);

DidoCP.run( function($rootScope, $location, $cookies) {
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if (next.$$route.needAuthen == true) {
                //check cookie logged in
                if ($cookies.logged == 'true') {
                    var admin_info = JSON.parse($cookies.admin_info);
                    $rootScope.admin_name = admin_info.firstname + ' ' + admin_info.lastname;
                    $rootScope.admin_avatar = admin_info.avatar;
                    $rootScope.logged = true;

                } else {
                    $rootScope.admin_name = undefined;
                    $rootScope.admin_avatar = undefined;
                    $rootScope.logged = false;
                    $location.path('/login');
                }
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