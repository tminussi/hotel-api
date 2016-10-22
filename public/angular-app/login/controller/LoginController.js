angular.module('meanhotel').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory) {
    var vm = this;

    vm.isLoggedIn = function () {
        return AuthFactory.isLoggedIn;
    };

    vm.login = function () {
        console.log(vm);
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            };
            $http.post('api/users/login', user)
                .then(function (response) {
                    console.log(response);
                    if (response.data.success) {
                        $window.sessionStorage.token = response.data.token;
                        AuthFactory.isLoggedIn = true;
                        vm.loggedInUser = vm.username;
                    }
                }).catch(function(err){
                console.log(err);
            });
        }
    };

    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
    };

    vm.isActiveTab = function (url) {
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    };
}