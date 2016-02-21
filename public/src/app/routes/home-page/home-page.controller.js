(function(angular) {
    'use strict';

    angular.module('waka').controller('homeController', ['$scope','$state', 'User', 'STATUS',  homeController]);

    function homeController($scope, $state, User, STATUS) {
        var vm = this;

        vm.logout = function() {
            User.logout().$promise.then(function(res) {
                console.log(res);
                $state.go('user-login');
            });
        };

        vm.user = function() {
            $state.go('user-page');
        };
    }
})(angular);