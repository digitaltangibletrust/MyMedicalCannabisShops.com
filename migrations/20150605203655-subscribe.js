var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.createTable('Subscriptions', {
    'id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true
    },
    'email': {
      'type': 'string',
      'notNull': true,
      'unique': true
    },
    'created_at': {
      'type': 'timestamp with time zone',
      'notNull': true
    },
    'updated_at': {
      'type': 'timestamp with time zone',
      'notNull': true
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('Subscriptions', callback);
};
