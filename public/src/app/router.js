/**
 * Created by hwen on 15/12/21.
 */

(function(angular) {
    'use strict';

    angular.module('waka').config(['$stateProvider', '$urlRouterProvider', routerConfig]);

    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('user-login', {
                url: '/user-login',
                templateUrl: 'app/routes/user-login/user-login.html',
                controller: 'loginController',
                controllerAs: 'account'
            })
            .state('home-page', {
                url: '/home-page',
                templateUrl: 'app/routes/home-page/home-page.html',
                controller: 'homeController',
                controllerAs: 'home'
            })
            .state('user-setting', {
                url: '/user-setting',
                templateUrl: 'app/routes/user-setting/user-setting.html' ,
                controller: 'userSettingController',
                controllerAs: 'vm'
            })


            .state('user-page', {
                url: '/user-page',
                templateUrl: 'app/routes/user-page/user-page.html',
                controller: 'userPageController',
                controllerAs: 'vm'
            })
            .state('user-page.answer', {
                url:'/answer',
                views: {
                    "user-page": {
                        templateUrl: 'app/routes/user-page-answer/user-page-answer.html',
                        controller: 'userAnswerController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('user-page.collection', {
                url:'/collection',
                views: {
                    "user-page" : {
                        templateUrl: 'app/routes/user-page-collection/user-page-collection.html',
                        controller: 'userCollectionController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('user-page.question', {
                url:'/question',
                views: {
                    "user-page" : {
                        templateUrl: 'app/routes/user-page-question/user-page-question.html',
                        controller: 'userQuestionController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('user-page.topic', {
                url:'/topic',
                views: {
                    "user-page" : {
                        templateUrl: 'app/routes/user-page-topic/user-page-topic.html',
                        controller: 'userTopicController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('user-page.mes', {
                url:'/mes',
                views: {
                    "user-page" : {
                        templateUrl: 'app/routes/user-page-mes/user-page-mes.html',
                        controller: 'userMesController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('find-question', {
                url: '/find-question',
                templateUrl: 'app/routes/find-question-page/find-question-page.html',
                controller: 'findQuestionController',
                controllerAs: 'vm'
            })

            .state('question', {
                url: '/question/:question_id',
                templateUrl: 'app/routes/question/question.html',
                controller: 'questionController',
                controllerAs: 'vm'
            })

            .state('question-editor', {
                url: '/question-editor',
                templateUrl: 'app/routes/question-editor/question-editor.html',
                controller: 'questionEditorController',
                controllerAs: 'vm'
            })

            .state('answer-editor', {
                url: '/answer-editor/:question_id',
                templateUrl: 'app/routes/answer-editor/answer-editor.html',
                controller: 'answerEditorController',
                controllerAs: 'vm'
            })

            .state('topic', {
                url: '/topic',
                templateUrl: 'app/routes/topic/topic.html',
                controller: 'topicController',
                controllerAs: 'vm'
            })

            .state('topic.tree', {
                url: '/:topic_id',
                templateUrl: 'app/routes/topic-tree/topic-tree.html',
                controller: 'topicTreeController',
                controllerAs: 'tree'
            })

            .state('search', {
                url: '/search/:keyword',
                templateUrl: 'app/routes/search-result/search-result.html',
                controller: 'searchController',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/user-login');
    }
})(angular);
