var app = angular.module('meanhotel', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'template/hotel/hotels.html',
        controller: 'HotelController',
        controllerAs: 'vm'
        })
        .when('/hotel/:id', {
            templateUrl: 'template/hotel/hotel-details.html',
            controller: 'HotelController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
});
