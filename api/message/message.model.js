/**
 * Created by hwen on 15/12/23.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/*
* type
* reply1: xx 回答了你关注的问题
* reply2: xx 评论了你的回答
* follow：xx 关注了你
* at:     xx @提到了你
* */
var MessageSchema = new Schema({
    type: { type:String },
    master_id: { type:ObjectId },
    author_id: { type:ObjectId },
    question_id: { type:ObjectId },
    answer_id: { type:ObjectId },
    unread: { type:Boolean, default:true },
    created_time: { type:Date, default:Date.now }
});

MessageSchema.index({master_id:1, unread:-1, created_time: -1});

module.exports = mongoose.model('Message', MessageSchema);