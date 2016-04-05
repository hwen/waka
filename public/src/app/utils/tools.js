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