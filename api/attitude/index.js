/**
 * Created by hwen.
 */
var express = require('express');
var router = express.Router();

var controller = require('./attitude.controller');

router.post('/getAttitude', controller.getAttitude);
router.post('/setAttitude', controller.setAttitude);

module.exports = router;