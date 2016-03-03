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
            var url = URL + '/user/';
            return $resource(URL + '/user/:id', {
                id: '@id'
            }, {
                login: {
                    method: 'POST',
                    url: url + 'login'
                },
                logout: {
                    method: 'GET',
                    url: url + 'logout'
                },
                getCurrentUser: {
                    method: 'GET',
                    url: url + 'currentUser'
                },
                update: {
                  method: 'POST',
                  url: url + 'update'
                },
                updatePassword: {
                  method: 'POST',
                  url: url + 'password'
                },
                getFollowingTopic: {
                    method: 'GET',
                    url: url + 'followingTopic/:_id',
                    params: {
                        _id: '@_id'
                    }
                }
            });
        }])

        .factory('Question', ['$resource', function($resource) {
            var url = URL+'/question/';
            return $resource(URL + '/question/:question_id', {
                question_id: '@question_id'
            }, {
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
                    url: url + 'getByUser/:author_id',
                    params: {
                        author_id: '@author_id'
                    }
                },
                attitude: {
                    method: 'POST',
                    url: url + 'attitude'
                },
                follow: {
                    method: 'POST',
                    url: url + 'follow'
                },
                getFollower: {
                    method: 'GET',
                    url: url + 'getFollower/:question_id',
                    params: {
                        question_id: '@question_id'
                    }
                },
                getFollowerList: {
                    method: 'GET',
                    url: url + 'getFollwerList/:follower_id',
                    params: {
                        follower_id: '@follower_id'
                    }
                }
            })
        }])

        .factory('Answer', ['$resource', function($resource) {
            var url = URL + '/answer/';
            return $resource(URL+'/answer', {}, {
                getByTopic: {
                    method: 'POST',
                    url: url + 'getByTopic'
                },
                getByUserTopics: {
                    method: 'POST',
                    url: url + 'getByUserTopics'
                },
                getByQuestion: {
                    method: 'GET',
                    url: url + 'getByQuestion/:question_id',
                    params: {
                        question_id: '@question_id'
                    }
                },
                getByUser: {
                    method: 'GET',
                    url: url + 'getByUser/:author_id',
                    params: {
                        author_id: '@author_id'
                    }
                },
                getByUserAndQuestion: {
                    method: 'POST',
                    url: url + 'getByUserAndQuestion'
                },
                collection: {
                    method: 'GET',
                    url: url + 'collection/:user_id',
                    params: {
                        user_id: '@user_id'
                    }
                },
                addCollection: {
                    method: 'POST',
                    url: url + 'addCollection'
                },
                attitude: {
                    method: 'POST',
                    url: url + 'attitude'
                },
                add: {
                    method: 'POST',
                    url: url + 'add'
                },
                update: {
                    method: 'POST',
                    url: url + 'update'
                },
                del: {
                    method: 'POST',
                    url: url + 'del'
                }
            });
        }])

        .factory('Topic', ['$resource', function($resource) {
            var url = URL + '/topic/';
            return $resource(URL+'/topic/:_id', {
                _id: '@_id'
            }, {
                add: {
                    method: 'POST',
                    url: url + 'add'
                },
                sub: {
                    method: 'GET',
                    url: url + 'sub/:_id',
                    params: {
                        _id: '@_id'
                    }
                },
                getAllChild: {
                    method: 'GET',
                    url: url + 'allChild/:_id',
                    params: {
                        _id: '@_id'
                    }
                },
                update: {
                    method: 'POST',
                    url: url + 'update'
                },
                list: {
                    method: 'GET',
                    url: url + 'list'
                },
                getTopicsId: {
                    method: 'POST',
                    url: url + 'getTopicsId'
                },
                getTopicByIdList: {
                    method: 'POST',
                    url: url + 'getTopicByIdList'
                }
            });
        }])


        .factory('Reply', ['$resource', function($resource) {
            var url = URL + '/reply/';
            return $resource(URL+'/reply', {}, {
                add: {
                    method: 'POST',
                    url: url + 'add'
                },
                update: {
                    method: 'POST',
                    url: url + 'update'
                },
                del: {
                    method: 'POST',
                    url: url + 'del'
                },
                list: {
                    method: 'GET',
                    url: url + 'list/:answer_id',
                    params: {
                        answer_id: '@answer_id'
                    }
                }
            });
        }])

        .factory('Message', ['$resource', function($resource) {
            var url = URL + '/message/';
            return $resource(URL+'/message', {}, {
                getMes: {
                    method: 'POST',
                    url: url + 'getMes'
                }
            });
        }])

})(angular);
