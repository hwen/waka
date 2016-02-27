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
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NavbarController($scope, $state, $timeout, User) {
            var vm = this;
            var imgPath = "../assets/images/icons/";

            vm.isOpen = false;
            vm.tooltipVisible = false;
            vm.avatar ="../assets/images/user/" + "default.png";

            $scope.$watch('vm.isOpen', function(isOpen) {
                if (isOpen) {
                    $timeout(function() {
                        vm.tooltipVisible = vm.isOpen;
                    }, 600);
                } else {
                    vm.tooltipVisible = vm.isOpen;
                }
            });

            vm.items = [
                {name:"我的主页", icon: imgPath+"people.svg", direction: "left", action: "toHomePage"},
                {name:"修改信息", icon: imgPath+"setting.svg", direction: "left", action: "toUpdateInfo"},
                {name:"退出", icon: imgPath+"logout.svg", direction: "left", action: "logout"}
            ];

            vm.action = function(action) {
                switch (action) {
                    case "toHomePage": toHomePage();break;
                    case "toUpdateInfo": toUpdateInfo();break;
                    case "logout" : logout();break;
                }
            };

            function toHomePage() {
                location.href = "/#/user-page";
            }

            function toUpdateInfo() {
                location.href = "/#/user-setting";
            }

            function logout() {
                cancelCookie();
                User.logout();
                $state.go("user-login");
            }

            function getAvatar() {
                User.get({id: getCookie("uid")}).$promise.then();
            }

            function cancelCookie() {
                var cookies = document.cookie.split(";");
                cookies.forEach(function(item) {
                    document.cookie = item + ";max-age=0";
                });
            }

            function getCookie(key) {
                var str = document.cookie;
                if (str) {
                    str = str.substr(str.indexOf(key));
                    var end = str.indexOf(';') >-1 ? str.indexOf(';') : str.length;
                    var value = str.substring(str.indexOf("=")+1, end);
                    return value;
                } else {
                    return null;
                }
            }
        }
    }

})(angular);
