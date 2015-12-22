/**
 * Created by hwen on 15/12/12.
 */

/*
* error response
* */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
    var viewFilePath = '404';
    var statusCode = 404;
    var result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, function(err) {
        if (err) { return res.json(result, result.status); }

        res.render(viewFilePath);
    });
};