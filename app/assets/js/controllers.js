'use strict';

/* Controllers */
angular.module('dido.controllers', [])
    .controller('DashboardCtrl', ['$scope', 'DashboardInfo',
        function ($scope, DashboardInfo) {
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
                $scope.num_place_30_days = x.place.num_place_30_days;
                $scope.num_question_30_days = x.question.num_question_30_days;
                $scope.num_answer_30_days = x.answer.num_answer_30_days;
            });
        }
    ])
    .controller('UserCtrl', ['$scope', 'UsersAPI', 'UserAPI', '$location',
        function ($scope, UsersAPI, UserAPI, $location) {

            $scope.editUser = function (userId) {
                $location.path('/user-detail/' + userId);
            };

            $scope.deleteUser = function (userId) {
                if (confirm("Do you want to delete this user?")) {
                    UserAPI.delete({ id: userId }, function (data) {
                        // Success
                        UsersAPI.query(function (data2) {
                            $scope.users = data2["data"];
                        });
                    }, function (error) {
                        // Error
                        $scope.has_error = true;
                        $scope.errors = error.data.message;
                    });
                }
            };

            $scope.createUser = function () {
                $location.path('/user-creation');
            };

            UsersAPI.query({}, function (value, responseHeaders) {
                // Success
                $scope.users = value["data"];
            }, function (response) {
                // Error
            });
        }
    ])
    .controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserAPI', '$location',
        function ($scope, $routeParams, UserAPI, $location) {
            var user = UserAPI.show({id: $routeParams.id}, function () {
                $scope.user = user["data"];
            });
            $scope.form_state = false;

            $scope.updateUser = function (id, state) {
                if (state == true) {
                    if (confirm("Do you want to update?")) {
                        var current_info = $scope.user;
                        UserAPI.update(current_info, function (data) {
                            // Success
                            $location.path('/user');
                        }, function (error) {
                            // Error
                            $scope.has_error = true;
                            $scope.errors = error.data.message;
                        });
                    }
                } else {
                    alert("User info isn't changed");
                }
            };

            $scope.cancel = function (state) {
                if (state == true) {
                    if (confirm("Form changed. Do you want to discard changes?")) {
                        $location.path('/user');
                    }
                } else {
                    $location.path('/user');
                }
            };
        }
    ])
    .controller('UserCreationCtrl', ['$scope', 'UserCreationAPI', '$location',
        function ($scope, UserCreationAPI, $location) {

            $scope.createUser = function (state) {
                if (state == true) {
                    if (confirm("Do you want to create?")) {
                        UserCreationAPI.create({user: $scope.user}, function (data) {
                            // Success
                            $location.path('/user');
                        }, function (error) {
                            // Error
                            $scope.has_error = true;
                            $scope.errors = error.data.message;
                        });
                    }
                } else {
                    alert("Please enter new user information");
                }
            };

            $scope.cancel = function (state) {
                if (state == true) {
                    if (confirm("Form changed. Do you want to discard changes?")) {
                        $location.path('/user');
                    }
                } else {
                    $location.path('/user');
                }
            };
        }
    ]) // DONE USER CONTROLLERS
    .controller('PlaceCtrl', ['$scope', 'UsersAPI', 'UserAPI', '$location',
        function ($scope, UsersAPI, UserAPI, $location) {

            $scope.editUser = function (userId) {
                $location.path('/user-detail/' + userId);
            };

            $scope.deleteUser = function (userId) {
                if (confirm("Do you want to delete this user?")) {
                    UserAPI.delete({ id: userId }, function (data) {
                        // Success
                        UsersAPI.query(function (data2) {
                            $scope.users = data2["data"];
                        });
                    }, function (error) {
                        // Error
                        $scope.has_error = true;
                        $scope.errors = error.data.message;
                    });
                }
            };

            $scope.createUser = function () {
                $location.path('/user-creation');
            };

            UsersAPI.query({}, function (value, responseHeaders) {
                // Success
                $scope.users = value["data"];
            }, function (response) {
                // Error
            });
        }
    ])
    .controller('PlaceDetailCtrl', ['$scope', '$routeParams', 'UserAPI', '$location',
        function ($scope, $routeParams, UserAPI, $location) {
            var user = UserAPI.show({id: $routeParams.id}, function () {
                $scope.user = user["data"];
            });
            $scope.form_state = false;

            $scope.updateUser = function (id, state) {
                if (state == true) {
                    if (confirm("Do you want to update?")) {
                        var current_info = $scope.user;
                        UserAPI.update(current_info, function (data) {
                            // Success
                            $location.path('/user');
                        }, function (error) {
                            // Error
                            $scope.has_error = true;
                            $scope.errors = error.data.message;
                        });
                    }
                } else {
                    alert("User info isn't changed");
                }
            };

            $scope.cancel = function (state) {
                if (state == true) {
                    if (confirm("Form changed. Do you want to discard changes?")) {
                        $location.path('/user');
                    }
                } else {
                    $location.path('/user');
                }
            };
        }
    ])
    .controller('PlaceCreationCtrl', ['$scope', 'UserCreationAPI', '$location',
        function ($scope, UserCreationAPI, $location) {

            $scope.createUser = function (state) {
                if (state == true) {
                    if (confirm("Do you want to create?")) {
                        UserCreationAPI.create({user: $scope.user}, function (data) {
                            // Success
                            $location.path('/user');
                        }, function (error) {
                            // Error
                            $scope.has_error = true;
                            $scope.errors = error.data.message;
                        });
                    }
                } else {
                    alert("Please enter new user information");
                }
            };

            $scope.cancel = function (state) {
                if (state == true) {
                    if (confirm("Form changed. Do you want to discard changes?")) {
                        $location.path('/user');
                    }
                } else {
                    $location.path('/user');
                }
            };
        }
    ]) //DONE PLACE CONTROLLERS
    .controller('FeedbackCtrl', [
        function ($scope) {
        }
    ])
    .controller('ReportCtrl', [
        function ($scope) {
        }
    ])
    .controller('QuestionCtrl', [
        function ($scope) {
        }
    ])
    .controller('AnswerCtrl', [
        function ($scope) {
        }
    ])