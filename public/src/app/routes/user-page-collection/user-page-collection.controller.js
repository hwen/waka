/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userCollectionController', ['$scope', '$state', 'User',
        'Answer', 'iCookie', userCollectionController]);

    function userCollectionController($scope, $state, User, Answer, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.collectionList = [];

        getCollection();

        function getCollection() {
            Answer.collection({user_id: uid})
                .$promise
                .then(function(res) {
                    console.log("getCollection");
                    vm.collectionList = res.data;
                });
        }
    }

})(angular);