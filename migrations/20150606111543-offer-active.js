var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.addColumn('Offers', 'active', {
    'type': 'boolean'
  }, callback);
};

exports.down = function (db, callback) {
  db.removeColumn('Offers', 'active', callback);
};
