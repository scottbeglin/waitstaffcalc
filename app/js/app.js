angular.module('waitStaff', ['ngRoute', 'ngAnimate'])
    .constant('VERSION', '2.1.5')

.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: './home.html'
        })
        .when('/new-meal', {
            templateUrl: './new-meal.html',
            controller: 'formCtrl'
        })
        .when('/my-earnings', {
            templateUrl: './my-earnings.html'
        })
        .when('/error', {
            template: "<p>Error Page Not Found</p>"
        })
        .otherwise({
            redirectTo: '/error'
        });
})

.run(function (VERSION, $rootScope, $location, $timeout) {

    $rootScope.$on('$routeChangeError', function () {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 1000);
    });

    $rootScope.version = VERSION;

    var initialContent = {
        total: 0,
        meals: 0,
        average: 0
    };

    var init = function () {
        $rootScope.earnings = angular.copy(initialContent);
    };

    $rootScope.reset = function () {
        init();

        $location.path('/new-meal');
    };

    init();
})

.controller('formCtrl', function ($scope, $rootScope) {

    $scope.submit = function () {
        $scope.submitted = true;
        if ($scope.inputForm.$valid) {
            var subtotal, tip;

            subtotal = $scope.input.mealPrice + $scope.input.mealPrice * $scope.input.taxRate / 100;
            tip = subtotal * $scope.input.tipPercentage / 100

            data = {
                subtotal: subtotal,
                tip: tip
            }

            $rootScope.$broadcast('displayContent', data);

            init();
        }
    };

    var init = function () {
        $scope.submitted = false;
        $scope.input = {
            "mealPrice": "",
            "tipPercentage": "",
            "taxRate": ""
        }
    };

    $scope.cancel = function () {
        init();
    };

    init();
})

.controller('displayCtrl', function ($scope, $rootScope) {
    var initialContent = {
        subtotal: 0,
        tip: 0,
        total: 0
    };

    var init = function () {
        $scope.data = angular.copy(initialContent);
    };

    $scope.$on('displayContent', function (event, data) {
        $scope.data.subtotal = data.subtotal;
        $scope.data.tip = data.tip;
        $scope.data.total = data.subtotal + data.tip;
        $rootScope.earnings.meals += 1;
        $rootScope.earnings.total += data.tip;
        $rootScope.earnings.average = $rootScope.earnings.total / $rootScope.earnings.meals;
    });

    init();
});
