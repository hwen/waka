/**
 * Created by hwen on 15/12/23.
 */
'use strict';

var express = require('express'),
    controller = require('./topic.controller');

var router = express.Router();

router.post('/add', controller.add);
router.post('/sub', controller.sub);
router.post('/update', controller.update);

module.exports = router;