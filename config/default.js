'use strict';

var path = require('path');
module.exports = {
  'port': 5000,
  'app': {
    'port': 5000,
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
      'name': 'DispensaryOffers.com',
      'address': 'info@email.dispensaryoffers.com'
    },
    'credentials': {
      'user': 'admin',
      'password': 'admin',
      'host': 'smtp.localhost',
      'ssl': true
    }
  },
  'projectName': 'DispensaryOffers',
  'mainApp': {
    'url': 'http://localhost:3000'
  },
  'dataApi': {
    'url': 'http://serica:a93kc7j@localhost:3000/apiroot'
  }
};
