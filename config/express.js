/**
 * Created by hwen on 15/12/12.
 */

'use strict';

var express = require('express');
//var favicon = require('server-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var uuid = require('uuid');
var config = require('./environment');
var morgan = require('morgan');

module.exports = function(app) {
    console.log("root is:"+config.root);
    app.set('views', path.join(config.root , 'public/src'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    //app.use(compression());

    app.use(bodyParser.urlencoded({
        limit: '5000mb',
        extended: true
    }));
    app.use(bodyParser.json({
        limit:'5000mb'
    }));

    app.use(cookieParser());

    app.use(session({
        genid: function(req) {
            return function() {
                uuid.v1();
            };
        },
        secret: 'iwaka',
        resave: false,
        saveUninitialized: true
    }));

    // config environment
    app.use(express.static(path.join(config.root, 'public/src')));   //控制静态资源加载根目录
    app.set('appPath', config.root + 'public/src');
    app.use(morgan('dev'));
};