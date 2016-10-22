angular.module('meanhotel', ['ngRoute']).config(config).run(run);

function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $routeProvider.when('/', {
        templateUrl: 'template/main/main.html',
        access: {
            restricted: false
        }
        })
        .when('/hotels', {
            templateUrl: 'template/hotel/hotels.html',
            controller: 'HotelController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/hotel/:id', {
            templateUrl: 'template/hotel/hotel-details.html',
            controller: 'HotelController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/register', {
            templateUrl: 'template/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        })
        .when('/profile', {
            templateUrl: 'template/profile/profile.html',
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (nextRoute.access && nextRoute.access.restricted && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    })
}
