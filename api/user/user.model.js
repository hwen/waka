/**
 * Created by hwen on 15/12/12.
 */

'use strict';

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var crypto  = require('crypto');

var UserSchema = new Schema({
        username: {
            type: String,
            index: true,
            unique: true
        },
        email: {
            type: String,
            index: true,
            unique: true
        },
        password: String,
        bio: String,
        description: String,
        avatar: {type:String, default: 'default.png'},

        answer_count: { type:Number, default:0 },
        question_count: { type:Number, default:0 },
        receive_support: { type:Number, default:0 },
        follower_count: { type:Number, default:0 },
        following_count: { type:Number, default:0 },
        collect_topic_count: { type:Number, default:0 }
});

/*
* Methods
* */

UserSchema.methods = {

    checkIsExist: function(username) {
        return this.username === username;
    },

    authenticate: function(plainText) {
        return this.encrytPassword(plainText) === this.password;
    },

    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    encrytPassword: function(password) {
        if (!password) return '';
        //var salt = new Buffer('iwaka', 'base64');
        return crypto.pbkdf2Sync(password, 'iwaka', 10000, 64).toString('base64');
    }
};

module.exports = mongoose.model('User', UserSchema);