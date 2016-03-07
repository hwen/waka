/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userMesController', ['$scope', '$state', 'User',
        'Question', 'Message', 'iCookie', userMesController]);

    function userMesController($scope, $state, User, Question, Message, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");
        vm.mesList = [];

        getMes();

        function getMes() {
            var params = {
                master_id: uid
            };
            Message.getMes(JSON.stringify(params))
                .$promise
                .then(function(res) {
                    if (res.status > -1) {
                        console.log("mes");
                        vm.mesList = res.data;
                    }
                });
        }
    }

})(angular);