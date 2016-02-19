/**
 * Created by hwen on 15/12/23.
 */
var Topic = require('./topic.model'),
    _ = require('lodash'),
    async = require('async'),
    invokeResult = require('../../components/invoke_result'),
    sysError = invokeResult.sysError,
    log = require('../../components/util/log');

/*
*  params: name
*  method: get
*  description: get all sub topics
* */
exports.sub = sub;

/*
*  params: name, parent(parent_name)
*  method: post
*  description:
* */
exports.add = add;

exports.update = update;

function update(req, res) {
	log.out(req.body);
	Topic.findOne({_id: req.body.id}).exec(function(err, result) {
		if (err) return sysError(res, err, '');
		if (!result) return res.json(404, 'topic not found');
		result.name = req.body.name;
		result.save(function(err, result) {
			return res.json(invokeResult.success(result, 'update topic success'));
		});
	});
}

function add(req, res) {
	log.out(req.body);
	if ( !req.body.name) return res.send(400, 'topic name cannot be null');
	if (req.body.parent) {
		Topic.findOne({name: req.body.parent}).exec(function(err, parent) {
			if (!parent) return res.send(404, 'parent not found');
			var newTopic = new Topic({name:req.body.name});
			newTopic.parent = parent;
			newTopic.save(function(err, topic) {
				if (err) {
					return sysError(res, err, 'save newTopic error (parent)');
				}
				return res.json(invokeResult.success(topic, 'save newTopic success (parent)'));
			});
		});
	} else {
		var newTopic = new Topic({name:req.body.name});
		newTopic.save(function(err, topic) {
			if (err) {
				return sysError(res, err, 'save newTopic error');
			}
			return res.json(invokeResult.success(topic, 'save newTopic success'));
		});
	}
}

function sub(req, res) {
	log.out(req.params);
	if (req.params.name) {
		Topic.findOne({name: req.params.name}).exec(function(err, result) {
			if (err) return sysError(res, err, 'sub findOne error');
			if (!result) return res.send(404, 'topic not found');
			result.getChildren(true, function(err, results) {
				if (err) return sysError(res, err, 'sub getChildren error');
				res.json(invokeResult.success(results, 'sub getChildren success'));
			});
		});
	}
}