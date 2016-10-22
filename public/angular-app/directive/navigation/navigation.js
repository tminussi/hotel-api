angular.module('meanhotel').directive('meanHotelNavigation', meanHotelNavigation);

function meanHotelNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angular-app/directive/navigation/navigation.html'
    };
}