/**
 * Created by hwen.
 */
'use strict';

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/*
*  type: 1: support, -1: unsupport
* */

var AttitudeSchema = new Schema({
    user_id: { type: ObjectId},
    question_id: {type: ObjectId},
    answer_id: {type: ObjectId},
    type: {type: Number, default: 0}
});

module.exports = mongoose.model('Attitude', AttitudeSchema);