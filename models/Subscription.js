'use strict';
var marked = require('marked');

module.exports = function (sequelize, DataTypes) {
  var Subscription = sequelize.define('Subscription', {
    'email': {
      'type': DataTypes.STRING,
      'allowNull': false,
      'unique': true
    }
  }, {
    'classMethods': {
      'associate': function (models) {}
    },
    'instanceMethods': {
      'render': function () {
        var obj = this.toJSON();
        obj.description = marked(obj.description);
        return obj;
      }
    }
  });
  return Subscription;
};
