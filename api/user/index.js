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
router.get("/hello", controller.index);

module.exports = router;