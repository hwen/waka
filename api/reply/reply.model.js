/**
 * Created by hwen on 15/12/23.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
    answer_id: { type:ObjectId },
    author_id: { type:ObjectId },
    support_count: { type:Number, default:0 },
    content: { type:String },
    created_time: { type:Date, default:Date.now }
});

ReplySchema.index({created_time:-1});
ReplySchema.index({author_id:1, created_time:-1});

module.exports = mongoose.model('Reply', ReplySchema);