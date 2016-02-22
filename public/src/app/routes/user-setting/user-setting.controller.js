(function(angular) {
    'use strict';
    angular.module('waka').controller('userSettingController', ['$scope', '$state', '$timeout',
        'User', 'Upload', userSettingController]);

    function userSettingController($scope, $state, $timeout, User, Upload) {
        var vm = this;

        vm.picFile = '';
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