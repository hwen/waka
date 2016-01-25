/**
 * Created by hwen on 15/12/12.
 */

/*
* Main application routes
 * */

'use strict';

var erros = require('./components/errors');

module.exports = function(app) {

    // insert routes below
    app.use('/api/user', require('./api/user'));
    app.use('/api/question', require('./api/question'));

    // all und
    //app.route('/:url(api|components|app)/*').get(erros[404]);

    // all other routes should redirect to the index.jade
    //app.route('/*')
    //    .get(function(req, res) {
    //        res.sendfile(app.get('views') + '/src/index.jade');
    //    });
    app.route('/')
        .get(function(req, res) {
            res.sendfile(app.get('appPath')+'/index.html');
        })
};