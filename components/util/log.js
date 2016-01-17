/**
 * Created by hwen on 16/1/17.
 */

var log = {
    out: function() {
        var content = '';
        for (var i=0; i<arguments.length; i++) content += '-：' + arguments[i];
        console.log((new Date).toLocaleString() + ': ' + content);
    },
    err: function() {
        var content = '';
        for (var i=0; i<arguments.length; i++) content += '-：' + arguments[i];
        console.error((new Date).toLocaleString() + ': ' + content);
    }
};

module.exports = log;