'use strict';

/* Controllers */
DidoCP.factory('Data', function(){
    return {message: "Hello"};
});

angular.module('dido.controllers', [])
    .controller('MyCtrl1', [
        function($scope, Data) {
            $scope.data = Data;
        }
    ])
    .controller('MyCtrl2', [
        function() {

        }
    ]);