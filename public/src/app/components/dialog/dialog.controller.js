(function(angular) {
    'use strict';
    angular.module('waka').directive('topicDialog', topicDialog);

    function topicDialog() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/dialog/dialog.html',
            scope: {
                parentTopic: '='
            },
            controller: dialogController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function dialogController($scope, $state, $mdDialog, Topic) {
            var vm = this;

            vm.cancel = function() {
                $mdDialog.cancel();
            };
            vm.addTopic = function() {
                $mdDialog.hide();
            };

            initData();

            function initData() {

            }

            function getTopicId() {
                var params = location.href.split('#/topic/')[1];
                return params;
            }
        }
    }
})(angular);
