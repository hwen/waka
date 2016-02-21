(function(angular) {
    'use strict';

    angular.module('waka').controller('userPageController', ['$scope', '$state', 'User',
        userPageController]);

    function userPageController($scope, $state, User) {
        var vm = this;
        vm.itemList = [{
            title: "我的提问",
            url: "question"
        }, {
            title: "我的回答",
            url: "answer"
        }, {
            title: "我的收藏",
            url: "collection"
        }, {
            title: "关注话题",
            url: "topic"
        }];

        vm.userSetting = function() {
            $state.go('user-setting');
        };

    }
})(angular);