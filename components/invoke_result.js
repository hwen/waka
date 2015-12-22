/**
 * Created by hwen on 15/12/12.
 */

'use strict';

var Constant = require('../config/constant');

exports.success = function(data) {
    return {
        status: Constant.STATUS.SUCCESS,
        data: data
    };
};

exports.failure = function(data) {
    return {
        status: Constant.STATUS.FAILURE,
        data: data
    };
};

exports.userExists = function() {
    var result = {
        status: Constant.STATUS.USER_EXISTS,
        data: 'user already existing'
    };
    return result;
};

exports.userNotFound = function() {
    var result = {
        status: Constant.STATUS.USER_NOT_FOUND,
        data: 'cannot find this user'
    };
    return result;
};

exports.programException = function(err) {
    var result = {
        status: Constant.STATUS.PROGRAM_EXCEPTION,
        data: err
    }
    return result;
};
