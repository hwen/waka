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
