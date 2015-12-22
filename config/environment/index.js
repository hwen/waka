/**
 * Created by hwen on 15/12/19.
 */


var path = require('path');

var config = {
    //root path of server
    root: path.normalize(__dirname + '/../..'),

    //server port
    port: 2333,

    //secret for session
    secrets: {
        session: 'iwaka-secret'
    },

    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};

module.exports = config;