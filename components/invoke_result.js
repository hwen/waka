/**
 * Created by hwen on 15/12/12.
 */

'use strict';
var log = require('./util/log');

exports.success = success;

exports.failure = failure;

exports.sysError = function(res, err, info) {
    var errInfo = info || '';
    log.err(info, err); return res.send(500, failure(errInfo,err));
};

function success(data, mes) {
    return {
        status: 0,
        data: data,
        error: 'no',
        mes: mes
    };
};

function failure(error, mes) {
    return {
        status: -1,
        error: error,
        mes: mes
    };
}
