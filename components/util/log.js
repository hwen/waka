/**
 * Created by hwen on 16/1/17.
 */

var log = {
    out: function() {
        var content = '\n\t\t';
        for (var i=0; i<arguments.length; i++) content += '>>>> ' + ( isOb(arguments[i]) ? JSON.stringify(arguments[i]) : arguments[i]) + '\n\t\t';
        console.warn('<-out-> '+(new Date).toLocaleString() + ': ' + content);
    },
    err: function() {
        var content = '';
        for (var i=0; i<arguments.length; i++) content += '>>>> ' + ( isOb(arguments[i]) ? JSON.stringify(arguments[i]) : arguments[i]) + '\n\t\t';
        console.error('<-err-> '+(new Date).toLocaleString() + ': ' + content);
    }
};

function isOb(x) {
    if (typeof  x === 'object') {
        return true;
    } else {
        return false;
    }
}

module.exports = log;