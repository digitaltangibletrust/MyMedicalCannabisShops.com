'use strict';

var config = require('config');
var bluebird = require('bluebird');
var fs = bluebird.promisifyAll(require('fs'));
var path = require('path');
var request = bluebird.promisifyAll(require('request'));

var apiRoot = config.dataApi.url;
var dataPath = path.join(__dirname, 'data.json');
var wait = 60 * 1000;


var app;
module.exports = init;

function init(_app) {
  app = _app;

  // load initial data from the cache
  readCache()
    .catch(fetch)
    .then(updateLocals)
    .then(writeCache);

  // get fresh data and update app.locals every `wait`
  loop();
}

function loop() {
  fetch()
    .then(updateLocals)
    .then(writeCache)
    .delay(wait)
    .then(loop)
    .catch(function (err) {
      throw err;
    });
}

function readCache() {
  return fs.readFileAsync(dataPath, 'utf8')
    .then(JSON.parse);
}

function fetch() {
  return bluebird.props({
    'offers': getData('offers'),
    'partners': getData('partners')
  });
}

function getData(endpoint) {
  return request.getAsync(apiRoot + '/' + endpoint)
    .spread(function (res, body) {
      return body;
    })
    .then(JSON.parse)
    .then(function (parsedBody) {
      return parsedBody.data[endpoint];
    });
}

function writeCache(data) {
  return fs.writeFileAsync(dataPath, JSON.stringify(data || {}), 'utf8');
}

function updateLocals(data) {
  app.locals.offerData = data;
  return data;
}
