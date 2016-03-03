/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';

    angular.module('waka').controller('topicTreeController', ['$scope', '$state',
        '$stateParams', '$mdDialog','Topic', 'User', topicTreeController]);

    function topicTreeController($scope, $state, $stateParams, $mdDialog, Topic,
         User) {
        var vm = this;

        vm.parentTopic = '';
        vm.currentTopic = '';
        vm.subTopicList = '';

        vm.showTopicDialog = showTopicDialog;

        initTree();

        function initTree() {
            Topic.get({ _id: getCurrentTopicId() })
                .$promise
                .then(function(res) {

                    vm.currentTopic = res.data;

                    getSubTopic(res.data._id);

                    if ( res.data.parent) {
                        getParentTopic(res.data.parent);
                    } else {
                        vm.parentTopic = {name: '无'};
                    }

                });
        }

        function getParentTopic(parentId) {
            Topic.get({_id:parentId})
                .$promise
                .then(function(res) {
                    vm.parentTopic = res.data;
                });
        }

        function getSubTopic(topicId) {
            Topic.sub({_id: topicId})
                .$promise
                .then(function(res) {
                    vm.subTopicList = res.data;
                });
        }

        function getCurrentTopicId() {
            return location.href.split('#/topic/')[1];
        }

        function showTopicDialog(ev) {
            $mdDialog.show({
                template: '<topic-dialog parent-topic="tree.initTree()"></topic-dialog>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function(addTopic) {
                });
        }
    }

})(angular);
