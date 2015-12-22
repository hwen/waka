/**
 * Created by hwen on 15/12/22.
 */

(function(angular) {
    angular.module('waka')

        .constant('STATUS', {
            'SUCCESS': 0, //成功
            'FAILED': 1,  //失败
            'NOLOGIN': 2, //未登录
            'ILLEGAL': 3, //不合法操作
            'NOTFOUND': 4, //未找到
            'NOEXIST': 5, //用户不存在
            'EXCEPTION': 100 //程序异常
        });
})(angular);