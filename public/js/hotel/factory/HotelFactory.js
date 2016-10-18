angular.module('meanhotel').factory('HotelFactory', HotelFactory);

function HotelFactory($http, $routeParams) {
    return {
        fetchAllHotels: fetchAllHotels,
        fetchOneHotel: fetchOneHotel
    };

    function fetchAllHotels() {
        return $http.get('api/hotels/')
            .then(success)
            .catch(fail);
    }

    function fetchOneHotel() {
        let hotelId = $routeParams.id;
        return $http.get('api/hotels/' + hotelId)
            .then(success)
            .catch(fail);
    }

    function success(response) {
        return response.data;
    }
    
    function fail(error) {
        return error.statusText;
    }
}