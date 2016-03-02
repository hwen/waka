/**
 * Created by hwen on 15/12/23.
 */
'use strict';

var express = require('express'),
    controller = require('./topic.controller');

var router = express.Router();

router.post('/add', controller.add);
router.get('/list', controller.list);
router.get('/sub/:_id', controller.sub);
router.get('/allChild/:_id', controller.getAllChild);
router.get('/:_id', controller.getTopicById);
//router.get('/list', controller.list);         不知为啥把list放到这个位置就会报错
/*
 *
 *    "message": "Cast to ObjectId failed for value \"list\" at path \"_id\"",
 *    "name": "CastError",
 *     "kind": "ObjectId",
 *     "value": "list",
 *    "path": "_id"
*
* */

router.post('/update', controller.update);


module.exports = router;
