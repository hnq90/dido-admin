'use strict';

/* Controllers */
angular.module('dido.controllers', [])
    .controller('AuthenCtrl', ['$scope', '$cookies', '$rootScope', '$location', 'LoginAPI', 'TokenAPI',
        function ($scope, $cookies, $rootScope, $location, LoginAPI, TokenAPI) {
            if ($cookies.auth_token != null) {
                var current_token = $cookies.auth_token;
                var current_id = $cookies.user_id;
                var current_email = $cookies.user_email;

                var check_token = TokenAPI.check({auth_token: current_token, user_id: current_id},function (data) {
                    if (check_token['data']) {
                        $cookies.logged = true;
                        $location.path('/home');
                    } else {
                        $cookies.logged = false;
                        $location.path('/login');
                    }
                });
            }

            $scope.login = function(email, password) {
                var user = {
                    email: email,
                    password: password
                };
                var login_data = LoginAPI.login({user: user}, function(data){
                    var rev_data = data['data'];
                    var auth_token = rev_data.auth_token;

                    if (rev_data.user.id == 5) {
                        $cookies.logged = true;
                        $cookies.auth_token = auth_token;
                        $cookies.user_id = rev_data.user.id;
                        $cookies.user_email = rev_data.user.email;
                        $location.path('/home');
                    }
                    else{
                        $cookies.logged = false;
                        $location.path('/login');
                    }
                }, function(error) {
                    $location.path('/login');
                });
            };
        }
    ])
    .controller('DashboardCtrl', ['$scope', 'DashboardInfo',
        function ($scope, DashboardInfo) {
            var datas = DashboardInfo.get(function () {
                var x = datas['data'];
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
            $scope.main_user_page = true;
            $scope.users = {};

            $scope.editUser = function (userId) {
                $location.path('/user-detail/' + userId);
            };

            $scope.deleteUser = function (userId) {
                if (confirm("Do have the right to delete this user?")) {
                    if (confirm("Do you really want to delete this user?")) {
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
                }
            };

            $scope.createUser = function () {
                $location.path('/user-creation');
            };

            $scope.searchUser = function () {
                $location.path('/user-search');
            };

            UsersAPI.query({}, function (value, headers) {
                // Success
                $scope.users = value["data"];

                var res_headers = headers();

                $scope.max_size = 5;
                $scope.total_page = parseInt(res_headers["x-total-pages"]) || 0;
                $scope.total_items = parseInt(res_headers["x-total"]) || 0;
                $scope.current_page = parseInt(res_headers["x-page"]) || 0;

                $scope.$watch('current_page', function (newPage) {
                    if ($scope.current_page > 0)
                        changePage(newPage);
                });
            }, function (response) {
                // Error
            });

            var changePage = function (page) {
                UsersAPI.query({page: page}, function (value, headers) {
                    // Success
                    $scope.users = value["data"];
                }, function (response) {
                    // Error
                });
            }
        }
    ])
    .controller('UserSearchCtrl', ['$scope', 'UsersAPI', 'UserAPI', 'UserSearchAPI', '$location',
        function ($scope, UsersAPI, UserAPI, UserSearchAPI, $location) {
            $scope.main_user_page = false;
            $scope.search_user_page = true;
            $scope.users = {};

            $scope.listUser = function () {
                $location.path('/user');
            };

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

            $scope.searchUser = function (keyword) {
                keyword = keyword == undefined ? '*' : keyword;
                UserSearchAPI.query({keyword: keyword}, function (value, headers) {
                    // Success
                    $scope.users = value["data"];

                    var res_headers = headers();
                    $scope.max_size = 5;
                    $scope.total_page = parseInt(res_headers["x-total-pages"]) || 0;
                    $scope.total_items = parseInt(res_headers["x-total"]) || 0;
                    $scope.current_page = parseInt(res_headers["x-page"]) || 0;

                    $scope.$watch('current_page', function (newPage) {
                        if ($scope.current_page > 0)
                            changePage(newPage, keyword);
                    });
                }, function (response) {
                    // Error
                });
            };

            var changePage = function (page, keyword) {
                UserSearchAPI.query({keyword: keyword, page: page}, function (value, headers) {
                    // Success
                    $scope.users = value["data"];
                }, function (response) {
                    // Error
                });
            }
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
    .controller('PlaceCtrl', ['$scope', 'PlacesAPI', 'PlaceAPI', '$location',
        function ($scope, PlacesAPI, PlaceAPI, $location) {
            $scope.main_place_page = true;

            $scope.editPlace = function (placeId) {
                $location.path('/place-detail/' + placeId);
            };

            $scope.deletePlace = function (placeId) {
                if (confirm("Do you want to delete this place?")) {
                    PlaceAPI.delete({ id: placeId }, function (data) {
                        // Success
                        PlacesAPI.query(function (data2) {
                            $scope.places = data2["data"];
                        });
                    }, function (error) {
                        // Error
                        $scope.has_error = true;
                        $scope.errors = error.data.message;
                    });
                }
            };

            $scope.searchPlace = function () {
                $location.path('/place-search');
            };

            $scope.createPlace = function () {
                $location.path('/place-creation');
            };

            var x = PlacesAPI.query({}, function (value, headers) {
                // Success
                $scope.places = value["data"];

                var res_headers = headers();

                $scope.max_size = 5;
                $scope.total_page = parseInt(res_headers["x-total-pages"]);
                $scope.total_items = parseInt(res_headers["x-total"]);
                $scope.current_page = parseInt(res_headers["x-page"]);

                $scope.$watch('current_page', function (newPage) {
                    if ($scope.current_page > 0)
                        changePage(newPage);
                });
            }, function (response) {
                // Error
            });

            var changePage = function (page) {
                PlacesAPI.query({page: page}, function (value, headers) {
                    // Success
                    $scope.places = value["data"];
                }, function (response) {
                    // Error
                });
            }
        }
    ])
    .controller('PlaceDetailCtrl', ['$scope', '$routeParams', 'PlaceAPI', 'DistrictsAPI', 'CitiesAPI',
        'CuisinesAPI', 'CategoriesAPI', 'PurposesAPI', 'PropertiesAPI', 'DishesAPI', 'DiningsAPI', '$location',
        function ($scope, $routeParams, PlaceAPI, DistrictsAPI, CitiesAPI,
                  CuisinesAPI, CategoriesAPI, PurposesAPI, PropertiesAPI, DishesAPI, DiningsAPI, $location) {

            var place = PlaceAPI.show({id: $routeParams.id}, function () {
                $scope.place = place["data"];

                // GET OTHER PLACE INFO
                var district_id = $scope.place.district.id;
                var city_id = $scope.place.district.city_id;

                var district = DistrictsAPI.query({city_id: city_id}, function () {
                    $scope.districts = district["data"];
                });

                $scope.old_city = city_id;
                $scope.old_district = district_id;

            });

            var city = CitiesAPI.query({}, function () {
                $scope.cities = city["data"];
            });

            var cuisines_data = CuisinesAPI.query({}, function () {
                $scope.cuisines = cuisines_data["data"];
            });

            var categories_data = CategoriesAPI.query({}, function () {
                $scope.categories = categories_data["data"];
            });

            var purposes_data = PurposesAPI.query({}, function () {
                $scope.purposes = purposes_data["data"];
            });

            var properties_data = PropertiesAPI.query({}, function () {
                $scope.properties = properties_data["data"];
            });

            var dishes_data = DishesAPI.query({}, function () {
                $scope.dishes = dishes_data["data"];
            });

            var dinings_data = DiningsAPI.query({}, function () {
                $scope.dinings = dinings_data["data"];
            });

            $scope.changeCity = function () {
                var city_id = $scope.place.city.id;
                var district = DistrictsAPI.query({city_id: city_id}, function () {
                    $scope.districts = district["data"];
                    if ($scope.old_city == city_id) {
                        $scope.place.district.id = $scope.old_district;
                    } else {
                        $scope.place.district.id = $scope.districts[0].id;
                    }
                });
            };

            $scope.form_state = false;

            $scope.updatePlace = function (id, state) {
                if (state == true) {
                    if (confirm("Do you want to update?")) {
                        var current_info = $scope.place;
//                        $scope.place.district_id = $scope.place.district.id;

                        if ($scope.place.categories != null && $scope.place.categories.length > 0)
                            $scope.place.category_ids = "[" + $scope.place.categories.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.cuisines != null && $scope.place.cuisines.length > 0)
                            $scope.place.cuisine_ids = "[" + $scope.place.cuisines.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.purposes != null && $scope.place.purposes.length > 0)
                            $scope.place.purpose_ids = "[" + $scope.place.purposes.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.properties != null && $scope.place.properties.length > 0)
                            $scope.place.property_ids = "[" + $scope.place.properties.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.dishes != null && $scope.place.dishes.length > 0)
                            $scope.place.dish_ids = "[" + $scope.place.dishes.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.dinings != null && $scope.place.dinings.length > 0)
                            $scope.place.dining_ids = "[" + $scope.place.dinings.map(function (item) {
                                return item.id;
                            }).toString() + "]";

//                        console.log(current_info);
                        PlaceAPI.update(current_info, function (data) {
                            // Success
                            $location.path('/place');
                        }, function (error) {
                            // Error
                            $scope.has_error = true;
                            $scope.errors = error.data.message;
                        });
                    }
                } else {
                    alert("Place info isn't changed");
                }
            };

            $scope.cancel = function (state) {
                if (state == true) {
                    if (confirm("Form changed. Do you want to discard changes?")) {
                        $location.path('/place');
                    }
                } else {
                    $location.path('/place');
                }
            };
        }
    ])
    .controller('PlaceCreationCtrl', ['$scope', 'PlaceAPI', 'PlacesAPI', 'DistrictsAPI', 'CitiesAPI',
        'CuisinesAPI', 'CategoriesAPI', 'PurposesAPI', 'PropertiesAPI', 'DishesAPI', 'DiningsAPI', '$location',
        function ($scope, PlaceAPI, PlacesAPI, DistrictsAPI, CitiesAPI,
                  CuisinesAPI, CategoriesAPI, PurposesAPI, PropertiesAPI, DishesAPI, DiningsAPI, $location) {

            $scope.place = {};
            $scope.place.latitude = 0;
            $scope.place.longitude = 0;

            var district = DistrictsAPI.query({city_id: 1}, function () {
                $scope.districts = district["data"];
                $scope.place.district = $scope.districts[0];

                $scope.place.latitude = $scope.place.district.latitude;
                $scope.place.longitude = $scope.place.district.longitude;

                $scope.map.center = $scope.place.district;
                $scope.map.clickedMarker = $scope.place.district;
            });

            var city = CitiesAPI.query({}, function () {
                $scope.cities = city["data"];
                $scope.place.city = $scope.cities[0];
            });

            var cuisines_data = CuisinesAPI.query({}, function () {
                $scope.cuisines = cuisines_data["data"];
            });

            var categories_data = CategoriesAPI.query({}, function () {
                $scope.categories = categories_data["data"];
            });

            var purposes_data = PurposesAPI.query({}, function () {
                $scope.purposes = purposes_data["data"];
            });

            var properties_data = PropertiesAPI.query({}, function () {
                $scope.properties = properties_data["data"];
            });

            var dishes_data = DishesAPI.query({}, function () {
                $scope.dishes = dishes_data["data"];
            });

            var dinings_data = DiningsAPI.query({}, function () {
                $scope.dinings = dinings_data["data"];
            });

            google.maps.visualRefresh = true;

            $scope.map = {
                control: {},
                options: {
                    streetViewControl: false,
                    panControl: false,
                    maxZoom: 20,
                    minZoom: 3
                },
                center: {
                    latitude: 21.0333333,
                    longitude: 105.85
                },
                zoom: 12,
                dragging: false,
                bounds: {},
                clickedMarker: {
                    latitude: null,
                    longitude: null
                },
                events: {
                    click: function (mapModel, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];

                        if (!$scope.map.clickedMarker) {
                            $scope.map.clickedMarker = {
                                latitude: e.latLng.lat(),
                                longitude: e.latLng.lng()
                            };
                        }
                        else {
                            $scope.map.clickedMarker.latitude = e.latLng.lat();
                            $scope.map.clickedMarker.longitude = e.latLng.lng();

                            $scope.place.longitude = $scope.map.clickedMarker.longitude;
                            $scope.place.latitude = $scope.map.clickedMarker.latitude;
                        }
                        $scope.$apply();
                    }
                }
            };

            $scope.changeCity = function () {
                var city_id = $scope.place.city.id;
                var district = DistrictsAPI.query({city_id: city_id}, function () {
                    $scope.districts = district["data"];
                    if ($scope.old_city == city_id) {
                        $scope.place.district.id = $scope.old_district;
                    } else {
                        $scope.place.district.id = $scope.districts[0].id;
                    }
                    $scope.map.center.latitude = $scope.place.city.latitude;
                    $scope.map.center.longitude = $scope.place.city.longitude;

                    $scope.place.latitude = $scope.place.city.latitude;
                    $scope.place.longitude = $scope.place.city.longitude;
                });
            };

            $scope.changeDistrict = function () {
                $scope.map.center.latitude = $scope.place.district.latitude;
                $scope.map.center.longitude = $scope.place.district.longitude;

                $scope.place.latitude = $scope.place.district.latitude;
                $scope.place.longitude = $scope.place.district.longitude;
            };



            $scope.createPlace = function (state) {
                if (state == true) {
                    if (confirm("Do you want to create?")) {
                        $scope.place.district_id = $scope.place.district.id;
                        if ($scope.place.categories != null && $scope.place.categories.length > 0)
                            $scope.place.category_ids = "[" + $scope.place.categories.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.cuisines != null && $scope.place.cuisines.length > 0)
                            $scope.place.cuisine_ids = "[" + $scope.place.cuisines.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.purposes != null && $scope.place.purposes.length > 0)
                            $scope.place.purpose_ids = "[" + $scope.place.purposes.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.properties != null && $scope.place.properties.length > 0)
                            $scope.place.property_ids = "[" + $scope.place.properties.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.dishes != null && $scope.place.dishes.length > 0)
                            $scope.place.dish_ids = "[" + $scope.place.dishes.map(function (item) {
                                return item.id;
                            }).toString() + "]";

                        if ($scope.place.dinings != null && $scope.place.dinings.length > 0)
                            $scope.place.dining_ids = "[" + $scope.place.dinings.map(function (item) {
                                return item.id;
                            }).toString() + "]";


                        PlacesAPI.create($scope.place, function (data) {
                            // Success
                            $location.path('/place');
                        }, function (error) {
                            // Error
                            $scope.has_error = true;
                            $scope.errors = error.data.message;
                        });
                    }
                } else {
                    alert("Please enter new place information");
                }
            };

            $scope.cancel = function (state) {
                if (state == true) {
                    if (confirm("Form changed. Do you want to discard changes?")) {
                        $location.path('/place');
                    }
                } else {
                    $location.path('/place');
                }
            };
        }
    ])
    .controller('PlaceSearchCtrl', ['$scope', 'PlacesAPI', 'PlaceAPI', 'PlaceSearchAPI', '$location',
        function ($scope, PlacesAPI, PlaceAPI, PlaceSearchAPI, $location) {
            $scope.main_place_page = false;
            $scope.search_place_page = true;
            $scope.places = {};

            $scope.listPlace = function () {
                $location.path('/place');
            };

            $scope.editPlace = function (placeId) {
                $location.path('/place-detail/' + placeId);
            };

            $scope.deletePlace = function (placeId) {
                if (confirm("Do you want to delete this place?")) {
                    PlaceAPI.delete({ id: placeId }, function (data) {
                        // Success
                        PlacesAPI.query(function (data2) {
                            $scope.places = data2["data"];
                        });
                    }, function (error) {
                        // Error
                        $scope.has_error = true;
                        $scope.errors = error.data.message;
                    });
                }
            };

            $scope.searchPlace = function (keyword) {
                keyword = keyword == undefined ? '*' : keyword;
                PlaceSearchAPI.query({keyword: keyword}, function (value, headers) {
                    // Success
                    $scope.places = value["data"];

                    var res_headers = headers();
                    $scope.max_size = 5;
                    $scope.total_page = parseInt(res_headers["x-total-pages"]) || 0;
                    $scope.total_items = parseInt(res_headers["x-total"]) || 0;
                    $scope.current_page = parseInt(res_headers["x-page"]) || 0;

                    $scope.$watch('current_page', function (newPage) {
                        if ($scope.current_page > 0)
                            changePage(newPage, keyword);
                    });
                }, function (response) {
                    // Error
                });
            };

            var changePage = function (page, keyword) {
                PlaceSearchAPI.query({keyword: keyword, page: page}, function (value, headers) {
                    // Success
                    $scope.places = value["data"];
                }, function (response) {
                    // Error
                });
            }
        }
    ])//DONE PLACE CONTROLLERS
    .controller('ReportCtrl', ['$scope', 'ReportsAPI', '$location',
        function ($scope, ReportsAPI) {
            var reports_data = ReportsAPI.query({}, function() {
                $scope.reports = reports_data['data']['reports'];
            });
        }
    ])
    .controller('QuestionCtrl', [
        function ($scope) {
        }
    ])
    .controller('AnswerCtrl', [
        function ($scope) {
        }
    ]);