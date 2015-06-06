'use strict';
var marked = require('marked');

module.exports = function (sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'description': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'logo': {
      'type': DataTypes.STRING
    }
  }, {
    'classMethods': {
      'associate': function (models) {
        Store.hasMany(models.Offer);
      }
    },
    'instanceMethods': {
      'render': function () {
        var obj = this.toJSON();
        obj.description = marked(obj.description);
        return obj;
      }
    }
  });
  return Store;
};
