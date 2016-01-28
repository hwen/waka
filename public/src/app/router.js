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
                controllerAs: 'result'
            })

        $urlRouterProvider.otherwise('/user-login');
    }
})(angular);