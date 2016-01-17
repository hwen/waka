/**
 * Created by hwen on 16/1/17.
 */

 'use strict';

 var filter = {
     notNull: function(str) {
         return str.length == 0 ? false:true;
     }
 };

module.exports = filter;