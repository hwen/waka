/**
 * Created by hwen on 15/12/23.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var QuestionSchema = new Schema({
    title: { type:String },
    content: { type:String },
    topics: [Schema.Types.ObjectId],
    author_id: { type: ObjectId},
    follow_count: { type:Number, default:0 },
    support_count: { type:Number, default:0 },
    unsupport_count: { type:Number, default:0 },
    created_time: { type:Date, default: Date.now }
});

var QtnFollow = new Schema({
    question_id: { type:ObjectId },
    follower_id: { type:ObjectId }
});

QuestionSchema.index({created_time: -1});
QuestionSchema.index({author_id: 1, created_time: -1});

QuestionSchema.methods = {
    support: function() {
        this.support_count++;
    },
    unsupport: function() {
        this.unsupport_count++;
    },
    follow: function() {
        this.follow_count++;
    },
    addTopics: function() {
        
    }
};

exports.Question = mongoose.model('Question', QuestionSchema);
exports.QtnFollow = mongoose.model('QtnFollow', QtnFollow);
// module.exports = mongoose.model('Question', QuestionSchema);
// module.exports = mongoose.model('QunFollow', QtnFollow);