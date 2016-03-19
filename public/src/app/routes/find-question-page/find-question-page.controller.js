(function(angular) {
    'use strict';
    angular.module('waka').controller('findQuestionController', ['$scope', '$state', '$timeout',
        'Question','Topic', 'User', 'iCookie', 'timeFormat', findQuestionController]);

    function findQuestionController($scope, $state, $timeout, Question, Topic,
                                    User, iCookie, timeFormat) {
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
                getNoAnswerQuestion();
            }, 500);
        }

        function getNewQuestion() {

            getUserFollowingTopic(function(topicIdList) {
                var params = {
                    topics: topicIdList
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

                var params = {
                    topics: topicIdList
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

                var params = {
                    topics: topicIdList
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

            User.getFollowingTopicAll({_id: iCookie.getCookie("uid")})
                .$promise
                .then(function(res) {
                    var user = res.data.user;
                    console.log('getFollowingTopic');
                    console.log(res);
                    if ( res.data.topics.length > 0 ) {

                        var topicIdList = res.data.topics.map(function(item) {
                            return item._id;
                        });

                        vm.followingTopicIdList = topicIdList;

                        callback(topicIdList);
                    } else {  // user is not following any topics

                        getAllTopic(function(topics) {
                            var topicIdList = topics.map(function(item) {
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
