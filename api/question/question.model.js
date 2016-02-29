/**
 * Created by hwen on 15/12/23.
 */

'use strict';

var _ = require('lodash');
var log = require('../../components/util/log');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var QuestionSchema = new Schema({
    title: { type:String },
    content: { type:String },
    contentHtml: {type:String},
    topics: [ObjectId],
    author_id: { type: ObjectId},
    follow_count: { type:Number, default:0 },
    support_count: { type:Number, default:0 },
    unsupport_count: { type:Number, default:0 },
    answer_count: {type:Number, default:0},
    score: {type:Number, default:0},
    created_time: { type:Date, default: Date.now }
});

var QtnFollow = new Schema({
    question_id: { type:ObjectId },
    follower_id: { type:ObjectId }
});

QuestionSchema.index({created_time: -1});
QuestionSchema.index({author_id: 1, created_time: -1});
QuestionSchema.index({topics: -1});
QuestionSchema.index({score: -1, created_time: -1});

QuestionSchema.methods = {
    support: function() {
        this.support_count++;
        this.score++;
    },
    unsupport: function() {
        this.unsupport_count++;
        this.score -= 2;
    },
    follow: function() {
        this.follow_count++;
        this.score += 2;
    },
    addAnswer: function() {
        this.answer_count++;
        this.score++;
    },
    delAnswer: function() {
        this.answer_count--;
        this.score--;
    },
    addTopics: function(topicId) {
        if (_.indexOf(this.topics, topicId) === -1) {
            this.topics.push(topicId);
        } else {
            log.err('addTopics', 'topic alreay existing', 'in questin model');
        }
    }
};

exports.Question = mongoose.model('Question', QuestionSchema);
exports.QtnFollow = mongoose.model('QtnFollow', QtnFollow);
