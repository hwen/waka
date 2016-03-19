/**
 * Created by hwen on 15/12/12.
 */
'use strict';

var express = require('express'),
    controller = require('./user.controller');

var router = express.Router();

router.post('/login', controller.login);
router.post("/", controller.create);
router.post("/imgUpload", controller.imgUpload);
router.post("/update", controller.update);
router.post("/password", controller.updatePassword);
router.get('/logout', controller.logout);
router.get('/currentUser', controller.currentUser);
router.get("/hello", controller.hello);
router.get("/followingTopic/:_id", controller.getFollowingTopic);
router.get("/followingTopicAll/:_id", controller.getFollowingTopicAll);
router.get("/:id", controller.get);

module.exports = router;
