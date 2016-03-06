/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userAnswerController', ['$scope', '$state', 'User',
        'Answer', 'iCookie', userAnswerController]);

    function userAnswerController($scope, $state, User, Answer, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.answerList = [];

        getUserAnswer();

        function getUserAnswer() {
            Answer.getByUser({author_id: uid})
                .$promise
                .then(function(res) {
                    if (res.status>-1) {
                        vm.answerList = res.data;
                    }
                });
        }
    }

})(angular);