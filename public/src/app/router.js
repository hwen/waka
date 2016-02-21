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



        $urlRouterProvider.otherwise('/user-login');
    }
})(angular);