'use strict';
var marked = require('marked');

module.exports = function (sequelize, DataTypes) {
  var Offer = sequelize.define('Offer', {
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'description': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'value': {
      'type': DataTypes.FLOAT,
      'defaultValue': 0
    },
    'ending_at': {
      'type': DataTypes.DATE,
      'allowNull': false
    },
    'active': {
      'type': DataTypes.BOOLEAN,
      'defaultValue': false
    },
    'url': {
      'type': DataTypes.STRING,
      'required': true
    }
  }, {
    'classMethods': {
      'associate': function (models) {
        Offer.belongsTo(models.Store);
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
  return Offer;
};
