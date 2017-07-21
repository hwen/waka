/**
 * Created by hwen on 15/12/21.
 */
(function(angular) {
    'use strict';

    angular.module('waka',['ui.router', 'ngResource', 'ngSanitize', 'ngMaterial', 'ngFileUpload',
        'ngImgCrop']);

    angular.module('waka').config(['$mdThemingProvider', materialConfig]);

    function materialConfig($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink');
    }
})(angular);
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
                },
                getFollowingTopicAll: {
                    method: 'GET',
                    url: url + 'followingTopicAll/:_id',
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
                unfollow: {
                    method: 'POST',
                    url: url + 'unfollow'
                },
                getFollower: {
                    method: 'GET',
                    url: url + 'getFollowers/:question_id',
                    params: {
                        question_id: '@question_id'
                    }
                },
                getFollowList: {
                    method: 'GET',
                    url: url + 'getFollowList/:follower_id',
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
                checkCollection: {
                    method: 'POST',
                    url: url+'checkCollection'
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

        .factory('Attitude', ['$resource', function($resource) {
            var url = URL + '/attitude/';
            return $resource(URL + '/attitude', {}, {
                getAttitude: {
                    method: 'POST',
                    url: url + 'getAttitude'
                },
                setAttitude: {
                    method: 'POST',
                    url: url + 'setAttitude'
                }
            });
        }])

})(angular);

(function(angular) {
	'use strict';

	angular.module('waka')

	.factory('iAES', function() {
		return {
			encrypt: function(key) {
				return CryptoJS.AES.encrypt(key, "iwaka");
			},
			decrypt: function(encrypted) {
				return CryptoJS.AES.decrypt(encrypted, "iwaka").toString(CryptoJS.enc.Utf8);
			}
		};
	})

	.factory('iCookie', function() {
		return {
			setUserCookie: function(_id, username, password) {
				document.cookie = "uid=" + _id + ";max-age=" + 60 * 60 * 24 * 10;
				document.cookie = "username=" + username +
					";max-age=" + 60 * 60 * 24 * 10;
				document.cookie = "password=" + password +
					";max-age=" + 60 * 60 * 24 * 10;
			},

			setCookie: function(key, value, maxAge) {
				document.cookie = key+"="+value+";max-age="+
					maxAge;
			},

			getCookie: function(key) {
				var str = document.cookie;
				if (str) {
					str = str.substr(str.indexOf(key));
					var end = str.indexOf(';') > -1 ? str.indexOf(';') : str.length;
					var value = str.substring(str.indexOf("=") + 1, end);
					return value;
				} else {
					return null;
				}
			},

			cancelCookie: function() {
				var cookies = document.cookie.split(";");
				cookies.forEach(function(item) {
					document.cookie = item + ";max-age=0";
				});
			},

			updatePasswordCookie: function(password) {
				password = password;
				document.cookie = "password=" + password +
					";max-age=" + 60 * 60 * 24 * 10;
			}

		};
	})

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka')

        .factory('timeFormat', function() {
            return {
                postedTime: function(time) {
                    var postedTime = new Date(time);
                    var current = new Date();
                    var result = (current - postedTime)/(1000 * 60);

                    if (result <= 60) {
                        return Math.floor(result) + "分钟前";
                    } else if (result > 60 && result <= 60*24) {
                        return Math.floor(result/60) + "小时前";
                    } else if (result > 60*24 && result <= 60*24*20 ) {
                        return Math.floor(result/(60*24)) + "天前";
                    } else {
                        return postedTime.getUTCFullYear() + '-' + (postedTime.getMonth()+1)+ '-' +
                                postedTime.getUTCDate();
                    }
                }
            };
        })
})(angular);
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

(function(angular) {
	angular.module('waka').directive('myEditor', myEditor);

	function myEditor() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/editor/editor.html',
			//在引入directive的地方指明要绑定的父级属性或方法，需要把驼峰转换成-
			scope: {
				content: "=",
				drContentHtml: "=",
				simplemde: "="
			},
			controller: editorController,
			controllerAs: 'editor',
			bindToController: true
		};

		return directive;

		function editorController($scope, $state, $timeout, Question, Answer) {
			var vm = this;
			var simplemde = new SimpleMDE({
				element: document.getElementById('editor'),
				spellChecker: false
			});

			$scope.$watch('vm.content', function() {
				$timeout(function() {
					initContent();
				}, 2000);
			});

			vm.simplemde = simplemde;
			vm.submit = function() {

			};

			vm.show = function() {
				console.log(simplemde.markdown(simplemde.value()));
				alert(simplemde.value());
			};

			function initContent() {
				simplemde.value(vm.content);
			}

		}
	}
})(angular);

/**
 * Created by hwen on 15/12/21.
 */

(function(angular) {
    'use strict';

    angular.module('waka').directive('navBar', customNavbar);

    function customNavbar() {
        var directive = {
            restrict: 'E',
            link: linkFn,
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {
                creationDate: '='
            },
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NavbarController($scope, $state, $timeout, User, Question) {
            var vm = this;
            var imgPath = "../assets/images/icons/";

            vm.isOpen = false;
            vm.tooltipVisible = false;
            vm.avatar ="../assets/images/user/" + "default.png";

            getAvatar();

            $scope.$watch('vm.isOpen', function(isOpen) {
                if (isOpen) {
                    $timeout(function() {
                        vm.tooltipVisible = vm.isOpen;
                    }, 600);
                } else {
                    vm.tooltipVisible = vm.isOpen;
                }
            });

            vm.items = [
                {name:"我的主页", icon: imgPath+"people.svg", direction: "left", action: "toHomePage"},
                {name:"修改信息", icon: imgPath+"setting.svg", direction: "left", action: "toUpdateInfo"},
                {name:"退出", icon: imgPath+"logout.svg", direction: "left", action: "logout"}
            ];

            vm.addQuestion = function() {
                $state.go("question-editor");
            };

            vm.action = function(action) {
                switch (action) {
                    case "toHomePage": toHomePage();break;
                    case "toUpdateInfo": toUpdateInfo();break;
                    case "logout" : logout();break;
                }
            };

            function toHomePage() {
                location.href = "/#/user-page/question";
            }

            function toUpdateInfo() {
                location.href = "/#/user-setting";
            }

            function logout() {
                cancelCookie();
                User.logout();
                $state.go("user-login");
            }

            function getAvatar() {
                User.get({id: getCookie("uid")}).$promise.then(function(res) {
                    vm.avatar = "../assets/images/user/" + res.data.avatar;
                });
            }

            function cancelCookie() {
                var cookies = document.cookie.split(";");
                cookies.forEach(function(item) {
                    document.cookie = item + ";max-age=0";
                });
            }

            function getCookie(key) {
                var str = document.cookie;
                if (str) {
                    str = str.substr(str.indexOf(key));
                    var end = str.indexOf(';') >-1 ? str.indexOf(';') : str.length;
                    var value = str.substring(str.indexOf("=")+1, end);
                    return value;
                } else {
                    return null;
                }
            }
        }

        function linkFn(scope, element, attrs) {
            //test version
            var input = document.getElementById('search'),
                oldValue = '';

            input.addEventListener('keydown', function(e){
                oldValue = this.value;
            }, false);

            input.addEventListener('keyup', function(e){
                var code = e.keyCode;
                if( code == 13 ){
                    if( oldValue === this.value ){
                        console.log(this.value);
                        location.href = '/#/search/' + this.value;
                    }
                }

            }, false);
        }
    }

})(angular);

(function(angular) {
	'use strict';

	angular.module('waka').controller('answerEditorController', [
		'$scope', '$state', 'Question', 'Answer', 'iCookie', answerEditorController]);

	function answerEditorController($scope, $state, Question, Answer, iCookie) {
		var vm = this;
		var question_id = location.hash.split('/')[2];
		var author_id = iCookie.getCookie("uid");
		var answer_id = '';

		vm.simplemde = '';
		vm.content = '';
		vm.contentHtml = '';
		vm.title = '';
		vm.hasAnswer = false;
		vm.addAnswer = addAnswer;
		vm.updateAnswer = updateAnswer;

		init();

		function addAnswer() {
			getContent();
			var params = {
				question_id: question_id,
				author_id: author_id,
				content: vm.content,
				contentHtml: vm.contentHtml
			};
			console.log(params);
			Answer.add(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						alert("添加回答成功");
						location.href = '/#/question/' + question_id;
					} else {
						alert("添加回答失败");
					}
				});
		}

		function updateAnswer() {
			getContent();
			var params = {
				_id: answer_id,
				author_id: author_id,
				content: vm.content,
				contentHtml: vm.contentHtml
			};
			console.log(params);
			Answer.update(JSON.stringify(params))
				.$promise
				.then(function(res) {
					console.log(res);
					if (res.status > -1) {
						alert("更新回答成功");
						location.href = '/#/question/' + question_id;
					} else {
						alert("更新回答失败");
					}
				});
		}

		function init() {
			var params = {
				question_id: question_id,
				author_id: author_id
			};
			console.log(params);
			Answer.getByUserAndQuestion(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.data[0]) {
						var data = res.data[0];
						vm.hasAnswer = true;
						vm.content = data.answer.content;
						vm.title = data.question.title;
						answer_id = data.answer._id;
					} else {
						getQuestion(question_id);
					}
				});
		}

		function getQuestion(question_id) {
			Question.get({question_id:question_id})
				.$promise
				.then(function(res) {
					var data = res.data[0];
					vm.title = data.question.title;
				});
		}

		function getContent() {
			if (!vm.simplemde) alert('getContent error');
			else {
				vm.content = vm.simplemde.value();
				vm.contentHtml = vm.simplemde.markdown(vm.simplemde.value());
			}
		}
	}
})(angular);

(function(angular) {
    'use strict';
    angular.module('waka').controller('findQuestionController', ['$scope', '$state', '$timeout',
        'Question','Topic', 'User', 'iCookie', 'timeFormat', findQuestionController]);

    function findQuestionController($scope, $state, $timeout, Question, Topic,
                                    User, iCookie, timeFormat) {
        var vm = this;
        vm.postedTime = timeFormat.postedTime;
        vm.allTopics = '';
        vm.followingTopic = '';
        vm.questionNew = '';
        vm.questionHot = '';
        vm.questionNoAnswer = '';

        initData();

        function initData() {
            getNewQuestion();
            $timeout(function () {
                getHotQuestion();
                getNoAnswerQuestion();
            }, 500);
        }

        function getNewQuestion() {

            getUserFollowingTopic(function(topicIdList) {
                var params = {
                    topics: topicIdList
                };

                Question.getNew(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log('getNew');
                        console.log(res);
                        vm.questionNew = res.data;
                    });
            });

        }

        function getHotQuestion() {
            getUserFollowingTopic(function(topicIdList) {

                var params = {
                    topics: topicIdList
                };

                Question.getHot(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log('getHot');
                        console.log(res);
                        vm.questionHot = res.data;
                    });
            });
        }

        function getNoAnswerQuestion() {
            getUserFollowingTopic(function(topicIdList) {

                var params = {
                    topics: topicIdList
                };

                Question.getNoAnswer(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log('getNoAnswer');
                        console.log(res);
                        vm.questionNoAnswer = res.data;
                    });
            });
        }


        function getUserFollowingTopic(callback) {
            if (vm.followingTopicIdList) {
                callback(vm.followingTopicIdList);
                return;
            }

            User.getFollowingTopicAll({_id: iCookie.getCookie("uid")})
                .$promise
                .then(function(res) {
                    var user = res.data.user;
                    console.log('getFollowingTopic');
                    console.log(res);
                    if ( res.data.topics.length > 0 ) {

                        var topicIdList = res.data.topics.map(function(item) {
                            return item._id;
                        });

                        vm.followingTopicIdList = topicIdList;

                        callback(topicIdList);
                    } else {  // user is not following any topics

                        getAllTopic(function(topics) {
                            var topicIdList = topics.map(function(item) {
                                return item._id;
                            });

                            callback(topicIdList);
                        });

                    }
                })
        }

        function getAllTopic(callback) {
            if (vm.allTopics) callback(vm.allTopics);
            else {
                Topic.list().$promise.then(function(res) {
                    vm.allTopics = res.data;
                    callback(res.data);
                });
            }
        }

    }

})(angular);

(function(angular) {
    'use strict';

    angular.module('waka').controller('homeController', ['$scope','$state', 'User',
        'Answer', 'Topic', 'iCookie', homeController]);

    function homeController($scope, $state, User, Answer, Topic, iCookie) {
        var vm = this;

        vm.allTopics = '';
        vm.followingTopic = '';
        vm.answerList = '';
        vm.answerListLeft = [];
        vm.answerListRight =[];

        getAnswers();

        function getAnswers() {
            getUserFollowingTopic(function(topicIdList) {
                var params = {
                    topicList: topicIdList
                };
                Answer.getByUserTopics(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        console.log(res);
                        vm.answerList = res.data;
                        res.data.forEach(function(item, index) {
                            if (index%2 ===0)
                                vm.answerListRight.push(item);
                            else
                                vm.answerListLeft.push(item);
                        });
                    });
            });
        }

        function getUserFollowingTopic(callback) {
            if (vm.followingTopicIdList) {
                callback(vm.followingTopicIdList);
                return;
            }

            User.getFollowingTopicAll({_id: iCookie.getCookie("uid")})
                .$promise
                .then(function(res) {
                    var user = res.data.user;
                    if ( res.data.topics.length > 0 ) {

                        var topicIdList = res.data.topics.map(function(item) {
                            return item._id;
                        });

                        vm.followingTopicIdList = topicIdList;

                        callback(topicIdList);
                    } else {  // user is not following any topics

                        getAllTopic(function(topics) {
                            var topicIdList = topics.map(function(item) {
                                return item._id;
                            });

                            callback(topicIdList);
                        });

                    }
                })
        }

        function getAllTopic(callback) {
            if (vm.allTopics) callback(vm.allTopics);
            else {
                Topic.list().$promise.then(function(res) {
                    vm.allTopics = res.data;
                    callback(res.data);
                });
            }
        }
    }
})(angular);

(function(angular) {
    'use strict';
    angular.module('waka').controller('questionController', ['$scope', '$state', '$sce',  'Question',
		'timeFormat', 'Answer', 'Attitude', 'Reply', 'iCookie', questionController]);

    function questionController($scope, $state, $sce, Question, timeFormat,
								Answer, Attitude, Reply, iCookie) {
    	var vm = this;
		var question_id = location.hash.split('/')[2];
		var user_id = iCookie.getCookie("uid");

    	vm.answerList = [];
    	vm.question = "";
		vm.addAnswer = addAnswer;
		vm.checkAuthor = checkAuthor;
		vm.setQuestionAttitude = setQuestionAttitude;
		vm.setAnswerAttitude = setAnswerAttitude;
		vm.followQuestion = followQuestion;
		vm.unfollowQuestion = unfollowQuestion;
		vm.addCollection = addCollection;
		vm.loadReply = loadReply;
		vm.addReply = addReply;
		vm.openReplyBox = openReplyBox;
		vm.isFollowing = false;
		vm.replyList = [];
		vm.replyContentList = [];

    	getQuestion();
		checkFollowState();

		vm.postedTime = timeFormat.postedTime;

		function setQuestionAttitude(type) {
			var params = {
				user_id: user_id,
				question_id: vm.question._id,
				type: type
			};

			Attitude.setAttitude(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						if (res.data.question) {
							vm.question = res.data.question;
						} else {
							type > 0 ? vm.question.support_count++: vm.question.support_count--;
						}
						vm.question.attitude = res.data.attitude;
					}
				});
		}

		function setAnswerAttitude(type, $index) {
			var params = {
				user_id: user_id,
				answer_id: vm.answerList[$index].answer._id,
				type: type
			};

			Attitude.setAttitude(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						console.log('answer attitude');
						console.log(res);
						if (res.data.answer) {
							vm.answerList[$index].answer = res.data.answer;
						} else {
							type > 0 ? vm.answerList[$index].answer.support_count++
								: vm.answerList[$index].answer.support_count--;
						}
						vm.answerList[$index].attitude = res.data.attitude;
					}
				});
		}

    	function getQuestion() {
			console.log(question_id);
    		Question.get({question_id:question_id}).$promise.then(function(res) {
    			if (res.status > -1) {
					console.log(res);
					var result = res.data[0];
    				vm.question = result.question;
    				vm.question.author = result.author;
                    vm.question.topics = result.topics;
    				vm.question.createdTime = timeFormat.postedTime(vm.question.created_time);

					getQuestionAttitude(vm.question._id);

    				getAnswers(vm.question._id);
    			} else {
    				alert('getQuestion error');
    			}
    		});
    	}

    	function getAnswers(qid) {
    		Answer.getByQuestion({question_id:qid}).$promise.then(function(res) {
    			if (res.status > -1) {
    				vm.answerList = res.data;
					getAnswerAttitude();
					setCollectionState();
    			} else {
    				alert('getAnswers error');
    			}
    		});
    	}

		function getQuestionAttitude(question_id) {
			var params = {
				user_id: user_id,
				question_id: question_id
			};
			Attitude.getAttitude(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						vm.question.attitude = res.data[0];
					}
				});
		}

		function getAnswerAttitude() {
			vm.answerList.forEach(function(item, index) {
				var params = {
					user_id: user_id,
					answer_id: item.answer._id
				};
				Attitude.getAttitude(JSON.stringify(params))
					.$promise
					.then(function(res) {
						if (res.status > -1) {
							vm.answerList[index].attitude = res.data[0];
						}
					});
			});
		}

		function addAnswer() {
			location.href = '/#/answer-editor/' + question_id;
		}

		function checkAuthor(author_id) {
			return iCookie.getCookie("uid") == author_id;
		}

		function followQuestion() {
			var params = {
				follower_id: user_id,
				question_id: question_id
			};
			Question.follow(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status>-1) {
						vm.question.following_count ++;
						$state.reload();
					}
				});
		}

		function unfollowQuestion() {
			var params = {
				question_id: question_id,
				follower_id: user_id
			};
			Question.unfollow(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						vm.question.following_count --;
						$state.reload();
					}
				});
		}

		function checkFollowState() {
			Question.getFollower({question_id: question_id})
				.$promise
				.then(function(res) {
					var followerList = res.data;
					followerList.forEach(function(item) {
						if (item._id == user_id) {
							vm.isFollowing = true;
						}
					});
				});
		}

		function addCollection(answer_id) {
			var params = {
				answer_id: answer_id,
				user_id: user_id
			};

			Answer.addCollection(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						alert("添加收藏成功");
						location.reload();
					}
				});
		}

		function setCollectionState() {
			vm.answerList.forEach(function(item, index) {
				checkCollectionState(item.answer._id, index);
			});
		}

		function checkCollectionState(answer_id, index) {
			var params = {
				user_id: user_id,
				answer_id: answer_id
			};
			Answer.checkCollection(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status>-1) {
						vm.answerList[index].collected = true;
					}
				});
		}

		function loadReply(answer_id, index) {
			Reply.list({answer_id: answer_id})
				.$promise
				.then(function(res) {
					if (res.status>-1) {
						console.log(res);
						vm.answerList[index].replys = res.data;
					}
				});
		}

		function addReply(answer_id, index) {
			var params = {
				answer_id: answer_id,
				author_id: user_id,
				content: vm.replyContentList[index]
			};
			Reply.add(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						alert("评论成功");
						location.reload();
					}
				})
		}

		function openReplyBox(answer_id, index) {
			if ( !vm.replyList[index]) {
				vm.replyList[index] = true;
				loadReply(answer_id, index);
			} else {
				vm.replyList[index] = false;
			}
		}

    }

})(angular);

(function(angular) {
	'use strict';

	angular.module('waka').controller('questionEditorController', [
		'$scope', '$state', 'Question', 'Topic', 'iCookie', questionEditorController]);

	function questionEditorController($scope, $state, Question, Topic, iCookie) {
		var vm = this;

		vm.querySearch = '';
		vm.allTopics = [];
		vm.topics = [];
		vm.filterSelected = true;
		vm.content = '';
		vm.contentHtml = '';
		vm.title = '';
		vm.simplemde = '';
		vm.submit = submitQuestion;

		loadTopics();

		function getContent() {
			if (!vm.simplemde) alert('getContent error');
			else {
				vm.content = vm.simplemde.value();
				vm.contentHtml = vm.simplemde.markdown(vm.simplemde.value());
			}
		}

		function submitQuestion() {
			if (!vm.title || !vm.topics) {
				alert("标题跟话题分类不能为空");
				return ;
			}
			var topicsId = vm.topics.map(function(item) {
				return item._id;
			});
			getContent();
			var params = {
				title: vm.title,
				topics: topicsId,
				content: vm.content,
				contentHtml: vm.contentHtml,
				author_id: iCookie.getCookie("uid")
			};
			console.log(params);
			Question.add(JSON.stringify(params)).$promise.then(function(res) {
				if (res.status === -1) {
					alert("添加问题失败");
				} else {
					console.log("添加问题成功");
					//$state.go("question", {question_id:res.data._id});
					location.href = '/#/question/' + res.data._id;
				}
			});
		}

		function querySearch(query) {
			var results = query ?
				vm.allTopics.filter(createFilterFor(query)) : [];
			return results;
		}

		function createFilterFor(query) {
			return function filterFn(topic) {
				return (topic.name.indexOf(query) !== -1);
			}
		}

		function loadTopics() {
			Topic.list().$promise.then(function(res) {
				vm.allTopics = res.data;
				vm.querySearch = querySearch;
			});
		}
	}
})(angular);

(function(angular) {
    'use strict';
    angular.module('waka').controller('searchController', ['$scope', '$state', 'User',
        'Question', 'iCookie', searchController]);

    function searchController($scope, $state, User, Question, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.questionList = [];

        searchQuestion();

        function getKeyWord() {
            if (location.href.indexOf('search/') > -1) {
                var keyword = location.href.split('search/')[1];
                return decodeURI(keyword);
            }
        }

        function searchQuestion() {

            var params = {
                keyword: getKeyWord()
            };

            Question.search(JSON.stringify(params))
                .$promise
                .then(function(res) {
                    if (res.status>-1) {
                        vm.questionList = res.data;
                    } else {

                    }
                });
        }

    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';

    angular.module('waka').controller('topicController', ['$scope', '$state',
        'Topic', 'User', 'iCookie', topicController]);

    function topicController($scope, $state, Topic, User, iCookie) {
        var vm = this;

        vm.querySearch = '';
        vm.allTopics = [];
        vm.topics = [];
        vm.filterSelected = true;
        vm.updateFollowingTopic = updateFollowingTopic;

        initData();

        function initData() {
            loadTopics();
            getUserFollowingTopic();
        }

        function querySearch(query) {
            var results = query ?
                vm.allTopics.filter(createFilterFor(query)) : [];
            return results;
        }

        function createFilterFor(query) {
            return function filterFn(topic) {
                return (topic.name.indexOf(query) !== -1);
            }
        }

        function loadTopics() {
            Topic.list().$promise.then(function(res) {
                vm.allTopics = res.data;
                vm.querySearch = querySearch;
                //$state.go('topic.tree', {topic_id: "56d6f9a7eb0e07a804e952c9"});
                location.href = '/#topic/56d6f9a7eb0e07a804e952c9';
            });
        }

        function getUserFollowingTopic() {
            var uid = iCookie.getCookie("uid");
            User.getFollowingTopic({_id: uid})
                .$promise
                .then(function(res) {
                    console.log(res);
                    vm.topics = res.data.topics;

                    // getTopicByIdList(topicList);
                });
        }

        // function getTopicByIdList(topicIdList) {
        //     var params = {topicIdList: topicIdList};
        //     Topic.getTopicByIdList(JSON.stringify(params))
        //         .$promise
        //         .then(function(res) {
        //             console.log(res);
        //             if (res.data) {
        //                 vm.topics = res.data;
        //             }
        //         });
        // }

        function updateFollowingTopic() {
            var updatedTopic = getUpdatedTopicList();
            var flag = true;

            if (updatedTopic.length === 0) {
                flag = confirm("你确认要取消所有订阅么？");
            }

            if (!flag) return;

            var params = {
                _id: iCookie.getCookie("uid"),
                following_topic: updatedTopic
            };

            console.log(params);

            User.update(JSON.stringify(params))
                .$promise
                .then(function(res) {
                    if (res.status > -1) {
                        console.log(res);
                        alert("关注的话题已更新");
                    } else {
                        alert("程序出错");
                        console.log(res);
                    }
                });
        }

        function getUpdatedTopicList() {
            var updatedTopic = vm.topics.map(function(topic) {
                return topic._id;
            });

            return updatedTopic;
        }
    }
})(angular);

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

/**
 * Created by hwen on 16/1/27.
 */
(function(angular) {
    'use strict';

    angular.module('waka').controller('loginController', ['$scope', '$timeout','$state', 'User',  loginController]);

    function loginController($scope, $timeout, $state, User) {
        var vm = this;
        var emRg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        vm.signin = true;
        vm.auth = {
            email: false,
            pass: false,
            loginErr: false,
            userExist: false,
            emailExist:false
        };

        (function checkCurrentUser() {
            if (getCookie("uid")) {
                var params = {
                    username: decrypt(getCookie("username")),
                    password: decrypt(getCookie("password"))
                };
                userLogin(params);
            }
        })();

        vm.login = function() {
            var params = {
                email: emRg.test(vm.email) ? vm.email: '',
                username: emRg.test(vm.email)? '': vm.email,
                password: vm.password
            };
            userLogin(params);
        };

        vm.signup = function() {
            var reg = vm.reg;
            if (reg.password!==reg.password2) {vm.auth.pass = true; $timeout(initAuth, 4000); return;}
            if (!emRg.test(reg.email)) {vm.auth.email = true;$timeout(initAuth, 4000); return;}
            var params = {
                "username": reg.username,
                "email": reg.email,
                "password": reg.password
            };
            User.save(params).$promise.then(function(res) {
                console.log(res);
                if (res.status === -1) {
                    switch (res.error) {
                        case 'email': vm.auth.emailExist = true;$timeout(initAuth, 4000); return;
                        case 'username': vm.auth.userExist = true;$timeout(initAuth, 4000);return;
                    }
                }
                if (res.status > -1) {
                    alert('注册成功');
                    location.reload();
                }
            }, function(err) {
                console.log('signup fail');
                console.log(err);
            });
        };

        function userLogin(params) {
            User.login(params).$promise.then(function(res) {
                console.log(res);
                if (res.status === -1) {
                    switch (res.error) {
                        case 'user':
                        case 'password': vm.auth.loginErr = true;
                            $timeout(initAuth, 4000);return;
                    }
                }
                if (res.status > -1) {
                    if (!getCookie("uid")) {
                        console.log('set cookie');
                        setCookie(res.data._id, res.data.username, params.password);
                    }
                    $timeout(function() {
                        $state.go('home-page');
                    }, 1000);
                }
            });
        }

        function initAuth() {
            vm.auth = {
                email: false,
                pass: false,
                userExist: false,
                loginErr: false,
                emailExist:false
            };
        }

        function setCookie(_id, username, password) {
            username = encrypt(username);
            password = encrypt(password);
            document.cookie = "uid="+_id + ";max-age=" + 60*60*24*10;
            document.cookie = "username="+username +
                ";max-age=" + 60*60*24*10;
            document.cookie = "password=" + password +
                ";max-age=" +  60*60*24*10;
        }

        function getCookie(key) {
            var str = document.cookie;
            if (str) {
                str = str.substr(str.indexOf(key));
                var end = str.indexOf(';') >-1 ? str.indexOf(';') : str.length;
                var value = str.substring(str.indexOf("=")+1, end);
                return value;
            } else {
                return null;
            }
        }

        function encrypt(key) {
            return CryptoJS.AES.encrypt(key, "iwaka");
        }

        function decrypt(encrypted) {
            return CryptoJS.AES.decrypt(encrypted, "iwaka").toString(CryptoJS.enc.Utf8);
        }
    }
})(angular);

(function(angular) {
    'use strict';

    angular.module('waka').controller('userPageController', ['$scope', '$state', 'User',
        'iCookie', userPageController]);

    function userPageController($scope, $state, User, iCookie) {
        var vm = this;

        vm.user = '';

        vm.itemList = [{
            title: "我的提问",
            url: "question"
        }, {
            title: "我的回答",
            url: "answer"
        }, {
            title: "订阅话题",
            url: "topic"
        }, {
            title: "我的消息",
            url: "mes"
        }, {
            title: "我的收藏",
            url: "collection"
        }
        ];

        getUser();

        vm.userSetting = function() {
            $state.go('user-setting');
        };

        function getUser() {
            User.get({id: iCookie.getCookie("uid")})
                .$promise
                .then(function(res) {
                    console.log(res);
                    vm.user = res.data;
                });
        }

    }
})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userAnswerController', ['$scope', '$state', 'User',
        'Answer', 'iCookie', userAnswerController]);

    function userAnswerController($scope, $state, User, Answer, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.answerList = [];

        getUserAnswer();

        function getUserAnswer() {
            Answer.getByUser({author_id: uid})
                .$promise
                .then(function(res) {
                    if (res.status>-1) {
                        vm.answerList = res.data;
                    }
                });
        }
    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userCollectionController', ['$scope', '$state', 'User',
        'Answer', 'iCookie', userCollectionController]);

    function userCollectionController($scope, $state, User, Answer, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.collectionList = [];

        getCollection();

        function getCollection() {
            Answer.collection({user_id: uid})
                .$promise
                .then(function(res) {
                    console.log("getCollection");
                    vm.collectionList = res.data;
                });
        }
    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userMesController', ['$scope', '$state', 'User',
        'Question', 'Message', 'iCookie', userMesController]);

    function userMesController($scope, $state, User, Question, Message, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");
        vm.mesList = [];

        getMes();

        function getMes() {
            var params = {
                master_id: uid
            };
            Message.getMes(JSON.stringify(params))
                .$promise
                .then(function(res) {
                    if (res.status > -1) {
                        console.log("mes");
                        vm.mesList = res.data;
                    }
                });
        }
    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userQuestionController', ['$scope', '$state', 'User',
        'Question', 'iCookie', userQuestionController]);

    function userQuestionController($scope, $state, User, Question, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");
        vm.questionList = [];

        getUserQuestion();

        function getUserQuestion() {
            Question.getByUser({author_id: uid})
                .$promise
                .then(function(res) {
                    if (res.status > -1) {
                        vm.questionList = res.data;
                    }
                });
        }
    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userTopicController', ['$scope', '$state', 'User',
        'Topic', 'iCookie', userTopicController]);

    function userTopicController($scope, $state, User, Topic, iCookie) {
        var vm = this;
        var uid = iCookie.getCookie("uid");

        vm.topicList = [];

        getUserTopic();

        function getUserTopic() {
            getUserFollowingTopic( function(topicIdList) {
                var params = {
                    topicIdList: topicIdList
                };
                Topic.getTopicByIdList(JSON.stringify(params))
                    .$promise
                    .then(function(res) {
                        if (res.status > -1) {
                            vm.topicList = res.data;
                        }
                    });
            } );
        }

        function getUserFollowingTopic(callback) {
            User.getCurrentUser()
                .$promise
                .then(function(res) {
                    if (res.status >-1) {
                        callback(res.data.following_topic);
                    }
                });
        }
    }

})(angular);
(function(angular) {
    'use strict';
    angular.module('waka').controller('userSettingController', ['$scope', '$state', '$timeout',
        'User', 'Upload', userSettingController]);

    function userSettingController($scope, $state, $timeout, User, Upload) {
        var vm = this;

        vm.picFile = '';
        vm.username = '';
        vm.bio = '';
        vm.description = '';
        vm.oldPassword = '';
        vm.newPassword = '';
        vm.newPassword2 = '';
        vm.savingAvatar = false;
        vm.savingInfo = false;
        vm.savingPassword = false;

        initData();

        vm.updateInfo = function() {
          var data = {
            username: vm.username,
            bio: vm.bio,
            description: vm.description
          };
          User.update(data).$promise.then(function(res) {
              vm.savingInfo = true;
            if (res.status > -1) {
              $timeout(function() {
                  vm.savingInfo = false;
                  vm.savingInfoMes = "保存成功";
              }, 2000);
            }
          });
        };

        vm.updatePassword = function() {
          if (vm.newPassword !== vm.newPassword2) {
              vm.savingPasswordMes = "密码不一致";
          }
          var data = {
            oldPassword: vm.oldPassword,
            newPassword: vm.newPassword
          };
          User.updatePassword(data).$promise.then(function(res) {
            vm.savingPassword = true;
            console.log(res);
            if (res.data.error) {
                vm.savingPassword = false;
                vm.savingPasswordMes = "旧密码不正确";
            } else {
                $timeout(function() {
                    vm.savingPassword = false;
                    vm.savingPasswordMes = "保存成功";
                    updatePasswordCookie(vm.newPassword);
                }, 2000);
            }
          });
        };

        vm.upload = function (dataUrl) {
            vm.savingAvatar = true;
            Upload.upload({
                url: '/api/user/imgUpload',
                file: Upload.dataUrltoBlob(dataUrl)
            }).then(function (res) {
                if (res.status > -1) {
                    $timeout(function() {
                        window.location.reload();
                    }, 2500);
                }
            });
        }

        function initData() {
            User.getCurrentUser().$promise.then(function(res) {
                var data = res.data;
                vm.username = data.username;
                vm.bio = data.bio;
                vm.description = data.description;
            });
        }

        function updatePasswordCookie(password) {
            password = encrypt(password);
            document.cookie = "password=" + password+
                ";max-age=" +  60*60*24*10;
        }

        function encrypt(key) {
            return CryptoJS.AES.encrypt(key, "iwaka");
        }

        function decrypt(encrypted) {
            return CryptoJS.AES.decrypt(encrypted, "iwaka").toString(CryptoJS.enc.Utf8);
        }
    }

})(angular);
