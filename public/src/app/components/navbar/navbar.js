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
            controllerAs: 'vm', // controller as viewModel
            bindToController: true
        };

        return directive;

        function NavbarController($scope, $state, $cookie, User, $http, STATUS) {
          var vm = this;

          vm.isOpen = false;
          vm.toolTipVisible = false;

          $scope.$watch('fab.isOpen', function(isOpen) {
            if (isOpen) {
              vm.toolTipVisible = vm.isOpen;
            }
          });

          vm.items = [
            {name:"我的主页", icon: "", direction: "left", action: "toHomePage"},
            {name:"修改信息", icon: "", direction: "left", action: "toUpdateInfo"},
            {name:"退出", icon: "", direction: "left", action: "logout"}
          ];

          vm.toHomePage = function() {
            $state.go("home-page");
          };

          vm.toUpdateInfo = function() {
            $state.go("user-setting");
          };

          vm.logout = fucntion() {
            $cookie.remove("uid");
            $state.go("user-login");
          };
        }
    }

})(angular);
