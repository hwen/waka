/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userTopicController', ['$scope', '$state', 'User',
        'Topic', 'iCookie', userTopicController]);

    function userTopicController($scope, $state, User, Topic, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.topicList = [];

        getUserTopic();

        function getUserTopic() {
            getUserFollowingTopic( function(topicIdList) {
                var params = {
                    topicIdList: topicIdList
                };
                Topic.getTopicByIdList(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        if (res.status > -1) {
                            vm.topicList = res.data;
                        }
                    });
            } );
        }

        function getUserFollowingTopic(callback) {
            User.getCurrentUser()
                .$promise
                .then(function(res) {
                    if (res.status >-1) {
                        callback(res.data.following_topic);
                    }
                });
        }
    }

})(angular);