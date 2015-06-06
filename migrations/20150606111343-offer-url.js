var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.addColumn('Offers', 'url', {
    'type': 'string'
  }, callback);
};

exports.down = function (db, callback) {
  db.removeColumn('Offers', 'url', callback);
};
