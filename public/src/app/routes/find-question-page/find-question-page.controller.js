(function(angular) {
    'use strict';
    angular.module('waka').controller('findQuestionController', ['$scope', '$state', 'Question',
        'Topic', 'iCookie', 'timeFormat', findQuestionController]);

    function findQuestionController($scope, $state, Question, Topic,  iCookie, timeFormat) {
        var vm = this;
        vm.postedTime = timeFormat.postedTime;

        getNewQuestion();

        function getNewQuestion() {
            Topic.list().$promise.then(function(res) {
                vm.allTopics = res.data;
                var topisList = vm.allTopics.map(function(item) {
                    return item._id;
                });
                console.log(topisList);
                var params = {
                    topics: topisList
                };
                Question.getNew(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log('getNew');
                        console.log(res);
                        vm.questionNew = res.data;
                    });
            });
        }

    }

})(angular);
