/**
 * Created by hwen on 15/12/12.
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var sessionStore = require('sessionstore');
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

    // config environment
    app.use(favicon(config.root + '/public/src/assets/images/favicon.ico'));

    app.use(session({
        genid: function(req) {
            return uuid.v1();
        },
        cookie:{maxAge: 900000},
        secret: 'i-waka',
        resave: false,
        saveUninitialized: true
    }));
    app.use(express.static(path.join(config.root, 'public/src')));   //控制静态资源加载根目录
    app.set('appPath', config.root + 'public/src');
    app.use(morgan('dev'));
};