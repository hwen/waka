/**
 * Created by hwen on 15/12/21.
 */

(function(angular) {
    'use strict';

    var URL = 'localhost:2333';

    angular.module('waka')

        .factory('User', ['$resource', function($resource) {
            return $resource(URL + '/api/users', {}, {
                login: {
                    method: 'POST',
                    url: URL + '/api/user/login'
                },
                logout: {
                    method: 'GET',
                    url: URL + '/api/user/logout'
                },
                signup: {
                    method: 'POST',
                    url: URL + '/api/user/'
                }
            })
        }])
})(angular);