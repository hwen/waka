/**
 * Created by hwen on 15/12/12.
 */

'use strict';

exports.success = function(data, mes) {
    return {
        status: 0,
        data: data,
        error: 'no',
        mes: mes
    };
};

exports.failure = function(error, mes) {
    return {
        status: -1,
        error: error,
        mes: mes
    };
};
