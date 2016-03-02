/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';

    angular.module('waka').controller('topicTreeController', ['$scope', '$state',
        '$stateParams', '$mdDialog','Topic', 'User', topicTreeController]);

    function topicTreeController($scope, $state, $stateParams, $mdDialog, Topic,
         User, dialogController) {
        var vm = this;
        vm.currentTopic = {name:'fuck', id: '110'};

        vm.showTopicDialog = showTopicDialog;

        function showTopicDialog(ev) {
            $mdDialog.show({
                template: '<topic-dialog parent-topic="tree.currentTopic"></topic-dialog>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function(addTopic) {
            });
        }
    }

    // function dialogController() {}
})(angular);
