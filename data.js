'use strict';

var config = require('config');
var _ = require('lodash');
var bluebird = require('bluebird');
var fs = bluebird.promisifyAll(require('fs'));
var path = require('path');
var request = bluebird.promisifyAll(require('request'));

var apiEndpoint = config.dataApi.url + '/apiroot/partnersDeep';
var dataPath = path.join(__dirname, 'data.json');
var updateFrequency = 60 * 1000;


var app;
module.exports = init;

function init(_app) {
  app = _app;

  // load initial data from the cache
  attemptReadFromCache()
    .then(updateLocals)
    .catch(fetchAndWrite);

  // get fresh data and update app.locals every updateFrequency
  loop();
}

function loop() {
  fetchAndWrite()
    .then(updateLocals)
    .then(function () {
      return bluebird.delay(updateFrequency);
    })
    .then(loop)
    .catch(function (err) {
      throw err;
    });
}

function attemptReadFromCache(stat) {
  return fs.readFileAsync(dataPath, 'utf8')
    .then(parse);
}

function fetchAndWrite() {
  return request.getAsync(apiEndpoint)
    .spread(function (res, body) {
      return body;
    })
    .then(parse) // make sure it's parseable before writing to the cache
    .then(function (parsedBody) {
      return fs.writeFileAsync(dataPath, JSON.stringify(parsedBody.data), 'utf8').return(parsedBody.data);
    });
}

function parse(data) {
  return new bluebird(function (resolve, reject) {
    try {
      var parsed = JSON.parse(data);
      resolve(parsed);
    } catch (e) {
      reject(e);
    }
  });
}

function updateLocals(data) {
  // TODO: this should probably just come from an offersDeep endpoint in the app
  var offers = _.chain(data.partners)
    .reduce(function (combined, partner) {
      return combined.concat(partner.Offers.map(function (_offer) {
        _offer.Partner = partner;
        delete _offer.Partner.Offers;
        return _offer;
      }));
    }, [])
    .concat()
    .value();

  app.locals.offerData = {
    'partners': data.partners,
    'offers': offers
  };
}
