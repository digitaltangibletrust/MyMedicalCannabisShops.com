var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.createTable('Offers', {
    'id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true
    },
    'name': {
      'type': 'string',
      'notNull': true
    },
    'description': {
      'type': 'string',
      'notNull': true
    },
    'value': {
      'type': 'double precision',
      'notNull': true,
      'defaultValue': 0
    },
    'store_id': {
      'type': 'int',
      'notNull': true
    },
    'ending_at': {
      'type': 'timestamp with time zone',
      'notNull': true
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
  db.dropTable('Offers', callback);
};
