/**
 * Created by hwen on 15/12/12.
 */
'use strict';

var express = require('express'),
    controller = require('./user.controller');

var router = express.Router();

router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.post("/", controller.create);
router.post("/hello", function(req, res) {
    res.send('hello world');
});

module.exports = router;