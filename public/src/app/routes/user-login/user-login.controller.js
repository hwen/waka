/**
 * Created by hwen on 16/1/27.
 */
(function(angular) {
    'use strict';

    angular.module('waka').controller('loginController', ['$scope', '$timeout','$state', 'User',  loginController]);

    function loginController($scope, $timeout, $state, User) {
        var vm = this;
        var emRg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        vm.signin = true;
        vm.auth = {
            email: false,
            pass: false,
            loginErr: false,
            userExist: false,
            emailExist:false
        };

        User.getCurrentUser().$promise.then(function(res) {
            if (res.data.uid) {
                $state.go('home-page');
            }
        });

        vm.login = function() {
            var params = {
                email: emRg.test(vm.email) ? vm.email: '',
                username: emRg.test(vm.email)? '': vm.email,
                password: vm.password
            };
            User.login(params).$promise.then(function(res) {
                console.log(res);
                if (res.status === -1) {
                    switch (res.error) {
                        case 'user':
                        case 'password': vm.auth.loginErr = true; $timeout(initAuth, 4000);return;
                    }
                }
                if (res.status > -1) {
                    console.log('login success');
                    $state.go('home-page');
                }
            });
        };

        vm.signup = function() {
            var reg = vm.reg;
            if (reg.password!==reg.password2) {vm.auth.pass = true; $timeout(initAuth, 4000); return;}
            if (!emRg.test(reg.email)) {vm.auth.email = true;$timeout(initAuth, 4000); return;}
            var params = {
                "username": reg.username,
                "email": reg.email,
                "password": reg.password
            };
            User.save(params).$promise.then(function(res) {
                console.log(res);
                if (res.status === -1) {
                    switch (res.error) {
                        case 'email': vm.auth.emailExist = true;$timeout(initAuth, 4000); return;
                        case 'username': vm.auth.userExist = true;$timeout(initAuth, 4000);return;
                    }
                }
                if (res.status > -1) {
                    console.log('signup success');
                    $state.go('home-page');
                }
            }, function(err) {
                console.log('signup fail');
                console.log(err);
            });
        };

        function initAuth() {
            vm.auth = {
                email: false,
                pass: false,
                userExist: false,
                loginErr: false,
                emailExist:false
            };
        }
    }
})(angular);