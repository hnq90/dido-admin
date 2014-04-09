'use strict';

/* Directives */


angular.module('dido.directives', []).
    directive('appVersion', ['version',
        function (version) {
            return function (scope, elm, attrs) {
                elm.text(version);
            };
        }
    ])
    .directive('sparkline', [function () {
        return {
            priority: 1,
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                var opts = {type: "bar", height: "30", barWidth: "4", barSpacing: "1", barColor: "#ffffff", negBarColor: "#eeeeee"}

                scope.$watch(attrs.ngModel, function () {
                    render();
                });
                var render = function () {
                    var model;
                    if (ngModel.$viewValue != undefined) {
                        angular.isString(ngModel.$viewValue) ? model = ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : model = ngModel.$viewValue;
                        var data;
                        angular.isArray(model) ? data = model : data = model.split(',');
                        $(elem).sparkline(data, opts);
                    }
                };
            }
        }
    }])
    .directive('userchart', [function () {
        return {
            restrict: 'A',
            priority: 3,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function () {
                    if(ngModel.$viewValue != undefined) {
                        var data = ngModel.$viewValue;
                        draw_one_chart($(element), "New User", data);
                    }
                });
            }
        };
    }])
    .directive('placechart', [function () {
        return {
            restrict: 'A',
            priority: 3,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function () {
                    if(ngModel.$viewValue != undefined) {
                        var data = ngModel.$viewValue;
                        draw_one_chart($(element), "New Place", data);
                    }
                });
            }
        };
    }])
    .directive('questionchart', [function () {
        return {
            restrict: 'A',
            priority: 3,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function () {
                    if(ngModel.$viewValue != undefined) {
                        var data = ngModel.$viewValue;
                        draw_one_chart($(element), "New Question", data);
                    }
                });
            }
        };
    }])
    .directive('answerchart', [function () {
        return {
            restrict: 'A',
            priority: 3,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function () {
                    if(ngModel.$viewValue != undefined) {
                        var data = ngModel.$viewValue;
                        draw_one_chart($(element), "New Answer", data);
                    }
                });
            }
        };
    }])
    .directive('genderchart', [function () {
        return {
            restrict: 'A',
            priority: 4,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function () {
                    if(ngModel.$viewValue != undefined) {
                        var data = ngModel.$viewValue;
                        draw_donutChart($(element), data);
                    }
                });
            }
        };
    }]);