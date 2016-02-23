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
            console.log(dataUrl);
            Upload.upload({
                url: '/api/user/imgUpload',
                file: Upload.dataUrltoBlob(dataUrl)
            }).then(function (response) {
                $timeout(function () {
                    vm.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) vm.errorMsg = response.status
                    + ': ' + response.data;
            }, function (evt) {
                vm.progress = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + vm.progress + '% ');
            });
        }
    }

})(angular);
