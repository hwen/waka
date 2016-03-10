/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';

    angular.module('waka').controller('topicController', ['$scope', '$state',
        'Topic', 'User', 'iCookie', topicController]);

    function topicController($scope, $state, Topic, User, iCookie) {
        var vm = this;

        vm.querySearch = '';
        vm.allTopics = [];
        vm.topics = [];
        vm.filterSelected = true;
        vm.updateFollowingTopic = updateFollowingTopic;

        initData();

        function initData() {
            loadTopics();
            getUserFollowingTopic();
        }

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

        function getUserFollowingTopic() {
            var uid = iCookie.getCookie("uid");
            User.getFollowingTopic({_id: uid})
                .$promise
                .then(function(res) {
                    console.log(res);
                    vm.topics = res.data.topics;

                    // getTopicByIdList(topicList);
                });
        }

        // function getTopicByIdList(topicIdList) {
        //     var params = {topicIdList: topicIdList};
        //     Topic.getTopicByIdList(JSON.stringify(params))
        //         .$promise
        //         .then(function(res) {
        //             console.log(res);
        //             if (res.data) {
        //                 vm.topics = res.data;
        //             }
        //         });
        // }

        function updateFollowingTopic() {
            var updatedTopic = getUpdatedTopicList();
            var flag = true;

            if (updatedTopic.length === 0) {
                flag = confirm("你确认要取消所有订阅么？");
            }

            if (!flag) return;

            var params = {
                _id: iCookie.getCookie("uid"),
                following_topic: updatedTopic
            };

            console.log(params);

            User.update(JSON.stringify(params))
                .$promise
                .then(function(res) {
                    if (res.status > -1) {
                        console.log(res);
                        alert("关注的话题已更新");
                    } else {
                        alert("程序出错");
                        console.log(res);
                    }
                });
        }

        function getUpdatedTopicList() {
            var updatedTopic = vm.topics.map(function(topic) {
                return topic._id;
            });

            return updatedTopic;
        }
    }
})(angular);
