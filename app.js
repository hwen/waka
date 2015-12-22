/**
 * Created by hwen on 15/12/19.
 */

'use strict';

var express =require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');


//Connect to database
var uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri, config.mongo.options);

//set up server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

//start server
server.listen(config.port, function() {
    console.log('Express server listening on %d', config.port);
    console.log(config);
});

// Expose app
exports = module.exports = app;