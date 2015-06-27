'use strict';

var _ = require('lodash');

module.exports.load = function (mods) {
  var modules = {};

  function getPath(start) {
    var p = start;
    return function (part) {
      p += '/' + part;
      return p;
    };
  }
  mods.forEach(function (mod) {
    var modPath = getPath('./');
    if (mod.indexOf('/') !== -1) {
      mod.split('/').reduce(function (total, key) {
        total[key] = _.extend(total[key] || {}, require(modPath(key) + '/index.js'));
        return total[key];
      }, modules);
    } else {
      modules[mod] = _.extend(modules[mod] || {}, require(modPath(mod) + '/index.js'));
    }
  });

  modules.setupParams = function (app) {
    for (var mod in modules) {
      var params = modules[mod].params;
      if (params) {
        for (var param in params) {
          app.param(param, params[param]);
        }
      }
    }
  };
  return modules;
};
