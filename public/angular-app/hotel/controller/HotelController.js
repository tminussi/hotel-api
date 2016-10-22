angular.module('meanhotel')
    .controller('HotelController', HotelController);

function HotelController(HotelFactory) {
    var vm = this;
    vm.title = 'Mean Hotel App';
    HotelFactory.fetchAllHotels()
        .then(function (response) {
            vm.hotels = response;
        });

    vm.fetchOneHotel = function (id) {
        console.log(id);
        return HotelFactory.fetchOneHotel(id).then(function (response) {
            return response;
        });
    }
}
