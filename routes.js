'use strict';
var modules = {};
['http', 'main'].forEach(function (mod) {
  modules[mod] = require('./views/' + mod + '/index.js');
});



module.exports.configure = function (app) {
  app.get('/', modules.main.show);
};
