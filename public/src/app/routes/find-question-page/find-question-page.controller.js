(function(angular) {
    'use strict';
    angular.module('waka').controller('findQuestionController', ['$scope', '$state', '$timeout',
        'Question','Topic', 'iCookie', 'timeFormat', findQuestionController]);

    function findQuestionController($scope, $state, $timeout, Question, Topic,  iCookie, timeFormat) {
        var vm = this;
        vm.postedTime = timeFormat.postedTime;
        vm.allTopics = '';
        vm.followingTopic = '';
        vm.questionNew = '';
        vm.questionHot = '';
        vm.questionNoAnswer = '';

        initData();

        function initData() {
            getNewQuestion();
            $timeout(function () {
                getHotQuestion();
                getNewQuestion();
            }, 500);
        }

        function getNewQuestion() {

            getUserFollowingTopic(function(topicIdList) {
                console.log(topicList);
                var params = {
                    topics: topicList
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

        function getHotQuestion() {
            getUserFollowingTopic(function(topicIdList) {
                console.log(topicList);
                var params = {
                    topics: topicList
                };

                Question.getHot(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log('getHot');
                        console.log(res);
                        vm.questionHot = res.data;
                    });
            });
        }

        function getNoAnswerQuestion() {
            getUserFollowingTopic(function(topicIdList) {
                console.log(topicList);
                var params = {
                    topics: topicList
                };

                Question.getNoAnswer(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log('getNoAnswer');
                        console.log(res);
                        vm.questionNoAnswer = res.data;
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
