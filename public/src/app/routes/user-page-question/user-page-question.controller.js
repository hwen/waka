/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userQuestionController', ['$scope', '$state', 'User',
        'Question', 'iCookie', userQuestionController]);

    function userQuestionController($scope, $state, User, Question, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");
        vm.questionList = [];

        getUserQuestion();

        function getUserQuestion() {
            Question.getByUser({author_id: uid})
                .$promise
                .then(function(res) {
                    if (res.status > -1) {
                        vm.questionList = res.data;
                    }
                });
        }
    }

})(angular);