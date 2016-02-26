/**
 * Created by hwen on 15/12/21.
 */

(function(angular) {
    'use strict';

    var URL = 'api';

    angular.module('waka')

        .factory('URL', [function() {
            return URL + '/';
        }])

        .factory('User', ['$resource', function($resource) {
            return $resource(URL + '/user', {}, {
                login: {
                    method: 'POST',
                    url: URL + '/user/login'
                },
                logout: {
                    method: 'GET',
                    url: URL + '/user/logout'
                },
                getCurrentUser: {
                    method: 'GET',
                    url: URL + '/user/currentUser'
                },
                update: {
                  method: 'POST',
                  url: URL + '/user/update'
                },
                updatePassword: {
                  method: 'POST',
                  url: URL + '/user/password'
                }
            });
        }])

        .factory('Question', ['$resource', function($resource) {
            var url = URL+'/question/';
            return $resource(URL + '/question', {}, {
                add: {
                    method: 'POST',
                    url: url + 'add'
                },
                search: {
                    method: 'POST',
                    url: url + 'search'
                },
                update: {
                    method: 'POST',
                    url: url + 'update'
                },
                getNoAnswer: {
                    method: 'POST',
                    url: url + 'getNoAnswer'
                },
                getNew: {
                    method: 'POST',
                    url: url + 'getNew'
                },
                getHot: {
                    method: 'POST',
                    url: url + 'getHot'
                },
                getByUser: {
                    method: 'GET',
                    url: url + 'getByUser/:author_id'
                },
                
            })
        }])

})(angular);
