/**
 * Created by hwen on 15/12/21.
 */

(function(angular) {
    'use strict';

    angular.module('waka').directive('navBar', customNavbar);

    function customNavbar() {
      var directive = {
          restrict: 'E',
          templateUrl: 'navbar.html',
          scope: {
              creationDate: '='
          },
          controller: NavbarController,
          controllerAs: 'vm',       // controller as viewModel
          bindToController: true
      };

      return directive;

        function NavbarController($scope, User, $state, STATUS) {
            $scope.login = function(req) {
                var params = {
                    username: req.username,
                    password: req.password
                };

                User.login(params).$promise.then(function(res) {
                    console.log('login res :'+res);
                    if (res.status === STATUS.SUCCESS) {
                        console.log('login success');
                    }
                });
            };

            $scope.signup = function(reg) {
                var params = {
                    username: reg.username,
                    email: reg.email,
                    password: reg.password
                };
                console.log('signup for:'+ params);
                User.save(params).$promise.then(function(res) {
                    if (res.status === STATUS.SUCCESS) {
                        console.log('signup success');
                    }
                });
                };
            }
    }

})(angular);