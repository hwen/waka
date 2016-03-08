(function(angular) {
    'use strict';
    angular.module('waka').controller('searchController', ['$scope', '$state', 'User',
        'Question', 'iCookie', searchController]);

    function searchController($scope, $state, User, Question, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.questionList = [];

        searchQuestion();

        function getKeyWord() {
            if (location.href.indexOf('search/') > -1) {
                var keyword = location.href.split('search/')[1];
                return decodeURI(keyword);
            }
        }

        function searchQuestion() {

            var params = {
                keyword: getKeyWord()
            };

            Question.search(JSON.stringify(params))
                .$promise
                .then(function(res) {
                    if (res.status>-1) {
                        vm.questionList = res.data;
                    } else {

                    }
                });
        }

    }

})(angular);