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
        'use strict';
        return {
            restrict: 'A',
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
    }]);