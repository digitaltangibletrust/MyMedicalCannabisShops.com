'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var request = Promise.promisifyAll(require('request'));

var apiEndpoint = 'https://www.lakebtc.com/api_v1/ticker';
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
    .then(function() {
      return Promise.delay(updateFrequency);
    })
    .then(loop)
    .catch(function(err) {
      throw err;
    });
}

function attemptReadFromCache(stat) {
  return fs.readFileAsync(dataPath, 'utf8')
    .then(parse);
}

function fetchAndWrite() {
  var parsed;
  return request.getAsync(apiEndpoint)
    .spread(function(res, body) {
      return body;
    })
    .then(parse) // make sure it's parseable before writing to the cache
    .then(function(data) {
      // write new data to the cache
      parsed = data;
      return fs.writeFileAsync(dataPath, JSON.stringify(data), 'utf8');
    })
    .return(parsed);
}

function parse(data) {
  return new Promise(function(resolve, reject) {
    try {
      var parsed = JSON.parse(data);
      resolve(parsed);
    } catch (e) {
      reject(e);
    }
  });
}

function updateLocals(data) {
  app.locals.offerData = data;
}