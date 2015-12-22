/**
 * Created by hwen on 15/12/21.
 */

(function(angular) {
    'use strict';

    angular.module('waka').directive('navBar', customNavbar);

    function customNavbar() {
      var directive = {
          restrict: 'E',
          templateUrl: 'app/components/navbar/navbar.html',
          scope: {
              creationDate: '='
          },
          controller: NavbarController,
          controllerAs: 'vm',       // controller as viewModel
          bindToController: true
      };

      return directive;

        function NavbarController($scope, User, $http, STATUS) {
            $scope.login = function(req) {
                var params = {
                    username: $scope.username,
                    password: $scope.password
                };
                User.login(params).$promise.then(function(res) {
                    console.log('login res :');
                    console.log(res);
                    if (res.status === STATUS.SUCCESS) {
                        console.log('login success');
                    }
                });
            };

            $scope.signup = function(reg) {
                var params = {
                    "username": reg.username,
                    "email": reg.email,
                    "password": reg.password
                };
                console.log('signup for:');
                console.log(params);
                User.save(params).$promise.then(function(res) {
                    console.log('what the fuck');
                    if (res.status === STATUS.SUCCESS) {
                        console.log('signup success');
                    }
                });
                };


            $scope.test = function() {
                console.log(User);
                var params = {
                    "username": "hwen",
                    "email": "291230513@qq.com",
                    "password": "123456"
                }
                $http.post('/api/user/hello', params).success(function(data) {
                    console.log(data);
                });
            };
            }
    }

})(angular);