(function(angular) {
    'use strict';
    angular.module('waka').directive('topicDialog', topicDialog);

    function topicDialog() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/dialog/dialog.html',
            scope: {
                initTree: '&'
            },
            controller: dialogController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function dialogController($scope, $state, $mdDialog, Topic) {
            var vm = this;

            vm.parentTopic = '';
            vm.topicToAdd = '';

            vm.cancel = function() {
                $mdDialog.cancel();
            };
            vm.addTopic = function() {
                if ( !vm.topicToAdd ) {
                    alert("话题名不能为空");
                    return;
                }
                var params = {
                    name: vm.topicToAdd,
                    parent: vm.parentTopic.name
                };
                $mdDialog.hide();
                Topic.add(params)
                    .$promise
                    .then(function(res) {
                        if (res.status > -1) {
                            alert("添加成功");
                            vm.initTree();
                            $state.reload();
                        }
                    });
            };

            initData();

            function initData() {
                getParentTopic();
            }

            function getParentTopic() {
                var params = location.href.split('#/topic/')[1];
                Topic.get({_id: params})
                    .$promise
                    .then(function(res) {
                        vm.parentTopic = res.data;
                    });
            }
        }
    }
})(angular);
