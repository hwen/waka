/**
 * Created by hwen on 15/12/23.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AnswerSchema = new Schema({
    question_id: { type:ObjectId },
    author_id: { type:ObjectId },
    support_count: { type:Number, default:0 },
    unsupport_count: { type:Number, default:0 },
    useless_count: { type:Number, default:0 },
    content: { type:String },
    created_time: { type:Date, default:Date.now }
});

var AswCollectSchema = new Schema({
    answer_id: { type:ObjectId },
    user_id: { type:ObjectId },
    created_time: { type:Date, default:Date.now }
});

AnswerSchema.index({created_time: -1});
AnswerSchema.index({author_id:1, created_time:-1});

module.exports = mongoose.model('Answer', AnswerSchema);
module.exports = mongoose.model('AnswerCollect', AswCollectSchema);