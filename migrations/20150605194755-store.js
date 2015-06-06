var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.createTable('Stores', {
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
    'logo': {
      'type': 'string'
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
  db.dropTable('Stores', callback);
};
