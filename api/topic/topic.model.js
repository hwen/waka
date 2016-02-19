/**
 * Created by hwen on 15/12/23.
 */

'use strict';

var tree = require('mongoose-path-tree');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
    name: { type:String, unique: true}
});

TopicSchema.plugin(tree);

module.exports = mongoose.model('Topic', TopicSchema);