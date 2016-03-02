/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';

    angular.module('waka').controller('topicController', ['$scope', '$state',
        'Topic', 'User', topicController]);

    function topicController($scope, $state, Topic, User) {
        var vm = this;

        vm.querySearch = '';
        vm.allTopics = [];
        vm.topics = [];
        vm.filterSelected = true;

        loadTopics();

        function querySearch(query) {
            var results = query ?
                vm.allTopics.filter(createFilterFor(query)) : [];
            return results;
        }

        function createFilterFor(query) {
            return function filterFn(topic) {
                return (topic.name.indexOf(query) !== -1);
            }
        }

        function loadTopics() {
            Topic.list().$promise.then(function(res) {
                vm.allTopics = res.data;
                vm.querySearch = querySearch;
                //$state.go('topic.tree', {topic_id: "56d6f9a7eb0e07a804e952c9"});
                location.href = '/#topic/56d6f9a7eb0e07a804e952c9';
            });
        }
    }
})(angular);
