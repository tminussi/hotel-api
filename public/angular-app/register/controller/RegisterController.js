angular.module('meanhotel')
    .controller('RegisterController', RegisterController);

function RegisterController($http) {
    var vm = this;
    vm.register = function () {
        let user = {
            username: vm.username,
            password: vm.password
        };

        if (!vm.username || !vm.password) {
            vm.error = 'Please add a username and password'
        } else {
            if (vm.password !== vm.passwordRepeat) {
                vm.error = "Passwords don't match";
            } else {
                $http.post('/api/users/register', user)
                    .then(function (response) {
                        console.log(response);
                        vm.message = 'You are now registered. Please log in';
                        vm.error = '';
                    }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    }
}