'use strict';

var fs = require('fs');
var path = require('path');
var modelsDirectory = process.cwd() + '/models';

module.exports = function (sequelize) {
  var db = {};
  db.sequelize = sequelize;
  fs.readdirSync(modelsDirectory)
    .filter(function (file) {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(function (file) {
      var model = sequelize.import(path.join(modelsDirectory, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  return db;
};
