angular.module('myApp', ['ngResource']);

var appMock = angular.module('appMock', ['myApp', 'ngMockE2E']);
appMock.run(function($httpBackend) {

    var customerList = [{
        _id: 123213,
        code: 'C1',
        name: 'Customer A'
    }, {
        _id: 234234,
        code: 'C2',
        name: 'Customer B'
    }, {
        _id: 322223,
        code: 'C3',
        name: 'Customer C'
    }];


    function findCustomerIndexById(id) {
        if (!id) return null;
        var index = -1;

        for (var i = 0; i < customerList.length; i++) {
            var o = customerList[i];
            if (id == o._id) {
                index = i;
                break;
            }
        }

        return index;
    }

    $httpBackend.whenGET("partials/partial1.html").respond("GET Called 1");
    $httpBackend.whenGET("partials/partial2.html").respond("GET Called 2");
    $httpBackend.whenGET(/\/api\/customers(\/\d*)*/).respond(function(method, url, data, headers) {
        var parts = url.replace("/api/customers", "").split("/");
        if (parts.length != 2) {
            return [200, customerList.slice()];
        }

        var id = parts[1];

        var index = findCustomerIndexById(id);

        if (index != -1) {
            return [200, customerList[index]];
        }

        return [404, "NOT-FOUND"];
    });

    //$httpBackend.whenGET(/\/api\/customers/).respond(200, customerList.slice());


    $httpBackend.whenPOST("/api/customers").respond(function(method, url, data, headers) {
        console.log("POST -> " + url);
        var o = angular.fromJson(data);
        o._id = new Date().getTime();
        customerList.push(o);
        return [200, "Success"];
    });

    $httpBackend.whenPUT(/\/api\/customers(\/\d*)*/).respond(function(method, url, data, headers) {
        console.log("PUT -> " + url);

        var o = angular.fromJson(data);
        var index = findCustomerIndexById(o._id);

        if (index != -1) {
            customerList[index] = o;
            return [200, 'SUCCESS!!'];
        }

        return [404, 'NOT-FOUND!!'];
    });


    $httpBackend.whenDELETE(/\/api\/customers\/\d*/).respond(function(method, url, data, headers) {
        console.log("DELETE -> " + url);

        var parts = url.replace("/api/customers", "").split("/");
        if (parts.length != 2) {
            return [409, "invalid id"];
        }

        var id = parts[1];

        var index = findCustomerIndexById(id);

        if (index != -1) {
            customerList.splice(index, 1);
            return [200, 'SUCCESS!!'];
        }

        return [404, 'NOT-FOUND!!'];
    });




    $httpBackend.whenGET(/^\/templates\//).passThrough();
});


/******************************************************** 
 **  CONTROLLERS
 ********************************************************/
function MainCtrl($scope, $http, $resource) {
    $scope.callType = "_$_RES_";
    $scope.titulo = "TESTE back";
    $scope.message = "";
    $scope.customers = [];
    $scope.customer = {};
    $scope.view = '/list.html';

    var _URL_ = '/api/customers';
    var _res = $resource(_URL_ + '/:id', {
        id: '@_id'
    }, {
        'update': {
            method: 'PUT'
        }
    });

    function _use_$resources_() {
        return $scope.callType != "_$_HTTP_";
    }

    function _fn_error(err) {
        $scope.message = err;
    }

    $scope.listCustomers = function() {
        console.log("listCustomers");
        $scope.view = '/list.html';

        var fn_success = function(data) {
            $scope.customers = data;
        };

        if (_use_$resources_()) {
            _res.query(fn_success, _fn_error);
        } else {
            $http.get(_URL_).success(fn_success).error(_fn_error);
        }
    };


    function _fn_success_put_post(data) {
        $scope.customer = {};
        $scope.listCustomers();
    }

    function createCustomer() {
        if (_use_$resources_()) {
            if ($scope.customer.$save) {
                $scope.customer.$save(_fn_success_put_post, _fn_error);
                return;
            }

            _res.post($scope.customer, _fn_success_put_post, _fn_error);
        } else {
            $http.post(_URL_, $scope.customer).success(_fn_success_put_post).error(_fn_error);
        }
    }


    function updateCustomer() {
        if (_use_$resources_()) {
            var params = {
                id: $scope.customer._id
            };
            if ($scope.customer.$update) {
                $scope.customer.$update(params, _fn_success_put_post, _fn_error);
                return;
            }
            _res.put(params, $scope.customer, _fn_success_put_post, _fn_error);
        } else {
            $http.put(_URL_, $scope.customer).success(_fn_success_put_post).error(_fn_error);
        }
    }

    function deleteCustomer() {
        if (_use_$resources_()) {
            var params = {
                'id': $scope.customer._id
            };
            if ($scope.customer.$update) {
                $scope.customer.$update(params);
                return;
            }
            _res.put(params, $scope.customer, _fn_success_put_post, _fn_error);
        } else {
            $http.put(_URL_, $scope.customer).success(_fn_success_put_post).error(_fn_error);
        }
    }

    $scope.delete = function(id) {
        if (!confirm("Are you sure you want do delete the Customer?")) return;
        if (_use_$resources_()) {
            var params = {
                'id': id
            };
            _res.remove(params, _fn_success_put_post, _fn_error);
        } else {
            $http.delete(_URL_ + "/" + id).success(_fn_success_put_post).error(_fn_error);
        }
    };


    $scope.newCustomer = function() {
        if (_use_$resources_()) {
            $scope.customer = new _res();
        } else {
            $scope.customer = {};
        }
        $scope.customerOperation = "New Customer";
        $scope.buttonLabel = "Create";
        $scope.view = "/form.html";
    };

    $scope.edit = function(id) {
        $scope.customerOperation = "Modify Customer";
        $scope.buttonLabel = "Save";

        $scope.message = "";

        var fn_success = function(data) {
            $scope.customer = data;
            $scope.view = '/form.html';
        };

        if (_use_$resources_()) {
            _res.get({
                'id': id
            }, fn_success, _fn_error);
        } else {
            $http.get(_URL_ + '/' + id).success(fn_success).error(_fn_error);
        }
    };


    $scope.save = function() {
        if ($scope.customer._id) {
            updateCustomer();
        } else {
            createCustomer();
        }
    };

    $scope.cancel = function() {
        $scope.message = "";
        $scope.customer = {};
        $scope.customers = [];
        $scope.listCustomers();
    };

    $scope.listCustomers();
}
MainCtrl.$inject = ['$scope', '$http', '$resource'];