module.exports = {
  'port': 3000,
  'app': {
    'port': 3000,
    'compression': {

    },
    'favicon': {
      'path': __dirname + '/public/favicon.ico'
    },
    'morgan': {
      'alias': 'combined'
    },
    'serveStatic': {
      'path': __dirname + '/public'
    }
  },
  'db': {
    'uri': 'postgres://test:test@localhost/mycannabisshops',
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
