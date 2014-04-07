'use strict';

/* Controllers */
angular.module('dido.controllers', [])
    .controller('DashboardCtrl', ['$scope', 'DashboardInfo',
        function($scope, DashboardInfo) {
            var datas = DashboardInfo.get(function () {
                var x = datas["data"];
                $scope.num_user = x.user.num_user;
                $scope.num_place = x.place.num_place;
                $scope.num_question = x.question.num_question;
                $scope.num_answer = x.answer.num_answer;
                $scope.num_user_7_days = x.user.num_user_7_days.toString();
                $scope.num_place_7_days = x.place.num_place_7_days.toString();
                $scope.num_question_7_days = x.question.num_question_7_days.toString();
                $scope.num_answer_7_days = x.answer.num_answer_7_days.toString();
                $scope.num_user_30_days = x.user.num_user_30_days;
            });
        }])
    .controller('ReportCtrl', [
        function() {
        }
    ])
    .controller('FeedbackCtrl', [
        function() {
        }
    ])
    .controller('UserCtrl', [
        function() {
        }
    ])
    .controller('PlaceCtrl', [
        function() {
        }
    ])
    .controller('QuestionCtrl', [
        function() {
        }
    ])
    .controller('AnswerCtrl', [
        function() {
        }
    ]);

//.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//    function($scope, $routeParams, Phone) {
//        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//            $scope.mainImageUrl = phone.images[0];
//        });
//
//        $scope.setImage = function(imageUrl) {
//            $scope.mainImageUrl = imageUrl;
//        }
//    }])