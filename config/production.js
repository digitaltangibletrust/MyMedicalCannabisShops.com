var path = require('path');
module.exports = {
  'port': 3000,
  'app': {
    'port': 3000,
    'compression': {

    },
    'favicon': {
      'path': path.resolve(__dirname, '../public/favicon.ico')
    },
    'morgan': {
      'alias': 'combined'
    },
    'serveStatic': {
      'path': path.resolve(__dirname, '../public')
    }
  },
  'db': {
    'uri': 'postgres://mmcs:HbS9MtZyTpfC76MaUIoq@localhost/mycannabisshops',
    'options': {
      'dialect': 'postgres',
      'pool': {
        'maxConnections': 5,
        'maxIdleTime': 30000
      },
      'define': {
        'underscored': true,
        'syncOnAssociation': true,
        'timestamps': true
      },
      'sync': {
        'force': true
      }
    }
  },
  'smtp': {
    'from': {
      'name': 'MyMedicalCannabisShops',
      'address': 'info@email.mymedicalcannabisshops.com'
    },
    'credentials': {
      'user': 'admin',
      'password': 'admin',
      'host': 'smtp.localhost',
      'ssl': true
    }
  },
};
