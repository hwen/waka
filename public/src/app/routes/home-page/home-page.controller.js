(function(angular) {
    'use strict';

    angular.module('waka').controller('homeController', ['$scope','$state', 'User', 'Answer', homeController]);

    function homeController($scope, $state, User, Answer) {
        var vm = this;

        vm.allTopics = '';
        vm.followingTopic = '';

        function getAnswers() {
            getUserFollowingTopic(function(topicIdList) {
                var params = {
                    topicList: topicIdList
                };
                Answer.getByUserTopics(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        
                    });
            });
        }

        function getUserFollowingTopic(callback) {
            if (vm.followingTopicIdList) {
                callback(vm.followingTopicIdList);
                return;
            }

            User.getFollowingTopic({_id: iCookie.getCookie("uid")})
                .$promise
                .then(function(res) {
                    var user = res.data.user;
                    if ( res.data.topics.length > 0 ) {

                        var topicIdList = res.topics.map(function(item) {
                            return item._id;
                        });

                        vm.followingTopicIdList = topicIdList;

                        callback(topicIdList);
                    } else {  // user is not following any topics

                        getAllTopic(function(topics) {
                            var topicIdList = res.topics.map(function(item) {
                                return item._id;
                            });

                            callback(topicIdList);
                        });

                    }
                })
        }

        function getAllTopic(callback) {
            if (vm.allTopics) callback(vm.allTopics);
            else {
                Topic.list().$promise.then(function(res) {
                    vm.allTopics = res.data;
                    callback(res.data);
                });
            }
        }
    }
})(angular);
