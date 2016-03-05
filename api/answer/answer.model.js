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
    score: { type:Number, default:0 },
    content: { type:String },
    contentHtml: {type:String},
    created_time: { type:Date, default:Date.now }
});

var AswCollectSchema = new Schema({
    answer_id: { type:ObjectId },
    user_id: { type:ObjectId },
    created_time: { type:Date, default:Date.now }
});

AnswerSchema.index({created_time: -1});
AnswerSchema.index({author_id:1, created_time:-1});
AnswerSchema.index({score:-1, created_time:-1});

AnswerSchema.methods = {
    changeToSupport: function() {
        this.unsupport_count--;
        this.support_count++;
        this.score+=3;
    },
    support: function() {
        this.support_count++;
        this.score++;
    },
    unsupport: function() {
        this.unsupport_count++;
        this.score -= 2;
    },
    changeToUnsupport: function() {
        this.support_count--;
        this.unsupport_count++;
        this.score -= 3;
    },
    useless: function() {
        this.useless_count++;
        this.score -= 3;
    }
};

exports.Answer = mongoose.model('Answer', AnswerSchema);
exports.AnswerCollect = mongoose.model('AnswerCollect', AswCollectSchema);
