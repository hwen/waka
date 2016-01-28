/**
 * Created by hwen on 15/12/23.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
    name: { type:String },
    parent_id: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Topic', TopicSchema);