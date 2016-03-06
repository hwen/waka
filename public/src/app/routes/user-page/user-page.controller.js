(function(angular) {
    'use strict';

    angular.module('waka').controller('userPageController', ['$scope', '$state', 'User',
        'iCookie', userPageController]);

    function userPageController($scope, $state, User, iCookie) {
        var vm = this;

        vm.user = '';

        vm.itemList = [{
            title: "我的提问",
            url: "question"
        }, {
            title: "我的回答",
            url: "answer"
        }, {
            title: "关注话题",
            url: "topic"
        },
        //    {
        //    title: "我的收藏",
        //    url: "collection"
        //}
        ];

        getUser();
        $state.go('user-page.question');

        vm.userSetting = function() {
            $state.go('user-setting');
        };

        function getUser() {
            User.get({id: iCookie.getCookie("uid")})
                .$promise
                .then(function(res) {
                    console.log(res);
                    vm.user = res.data;
                });
        }

    }
})(angular);