/**
 * Created by hwen on 15/12/21.
 */
(function(angular) {
    'use strict';

    angular.module('waka',['ui.router', 'ngResource', 'ngMaterial', 'ngFileUpload',
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



        $urlRouterProvider.otherwise('/user-login');
    }
})(angular);
/**
 * Created by hwen on 15/12/22.
 */

(function(angular) {
    angular.module('waka')

        .constant('STATUS', {
            'SUCCESS': 0, //�ɹ�
            'FAILED': 1,  //ʧ��
            'NOLOGIN': 2, //δ��¼
            'ILLEGAL': 3, //���Ϸ�����
            'NOTFOUND': 4, //δ�ҵ�
            'NOEXIST': 5, //�û�������
            'EXCEPTION': 100 //�����쳣
        });
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
        function NavbarController($scope, $state, $timeout, User) {
            var vm = this;

            vm.isOpen = false;
            vm.tooltipVisible = false;
            vm.avatar ="../assets/images/user/" +getCookie("uid") + ".png";

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
                {name:"我的主页", icon: "", direction: "left", action: "toHomePage"},
                {name:"修改信息", icon: "", direction: "left", action: "toUpdateInfo"},
                {name:"退出", icon: "", direction: "left", action: "logout"}
            ];

            vm.action = function(action) {
                switch (action) {
                    case "toHomePage": toHomePage();break;
                    case "toUpdateInfo": toUpdateInfo();break;
                    case "logout" : logout();break;
                }
            };

            function toHomePage() {
                $state.go("user-page");
            }

            function toUpdateInfo() {
                $state.go("user-setting");
            }

            function logout() {
                cancelCookie();
                User.logout();
                $state.go("user-login");
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
    }

})(angular);


(function(angular) {
    'use strict';

    angular.module('waka').controller('homeController', ['$scope','$state', 'User', 'STATUS',  homeController]);

    function homeController($scope, $state, User, STATUS) {
        var vm = this;

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
                    console.log('signup success');
                    $state.go('home-page');
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
                    $state.go('home-page');
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
        userPageController]);

    function userPageController($scope, $state, User) {
        var vm = this;
        vm.itemList = [{
            title: "我的提问",
            url: "question"
        }, {
            title: "我的回答",
            url: "answer"
        }, {
            title: "我的收藏",
            url: "collection"
        }, {
            title: "关注话题",
            url: "topic"
        }];

        vm.userSetting = function() {
            $state.go('user-setting');
        };

    }
})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userAnswerController', ['$scope', '$state', 'User',
        userAnswerController]);

    function userAnswerController($scope, $state, User) {

    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userCollectionController', ['$scope', '$state', 'User',
        userCollectionController]);

    function userCollectionController($scope, $state, User) {

    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userQuestionController', ['$scope', '$state', 'User',
        userQuestionController]);

    function userQuestionController($scope, $state, User) {

    }

})(angular);
/**
 * Created by hwen.
 */
(function(angular) {
    'use strict';
    angular.module('waka').controller('userTopicController', ['$scope', '$state', 'User',
        userTopicController]);

    function userTopicController($scope, $state, User) {

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

        vm.updateInfo = function() {
          var data = {
            username: vm.username,
            bio: vm.bio,
            description: vm.description
          };
          User.update(data).$promise.then(function(res) {
            console.log(res);
            if (res.status > -1) {
              alert('更新成功');
            }
          });
        };

        vm.updatePassword = function() {
          if (vm.newPassword !== vm.newPassword2) {
            alert("两次输入的密码不一样");
          }
          var data = {
            oldPassword: vm.oldPassword,
            newPassword: vm.newPassword
          };
          User.updatePassword(data).$promise.then(function(res) {
            console.log(res);
            if (res.error) {
              alert("旧密码不正确");
            } else {
              alert("修改密码成功");
            }
          });
        };

        vm.upload = function (dataUrl) {
            //漏掉name属性，触发不了 req.busboy.on('file') 事件
            Upload.upload({
                url: '/api/user/imgUpload',
                file: Upload.dataUrltoBlob(dataUrl)
            }).then(function (response) {
                console.log(response);
            });
        }
    }

})(angular);
