'use strict';
var fs = require('fs');
var async = require('async');
var config = require('config');
var request = require('request');

function toBase64(path, callback) {
  fs.readFile(path, function (err, contents) {
    if (err) {
      return callback(err);
    }

    if (!contents) {
      return callback(null, null);
    }

    fs.unlink(path, function (err) {
      if (err) { //ignore error
        console.log(err);
      }
      return callback(null, contents.toString('base64'));
    });
  });
}

module.exports.processUploads = function (req, res, next) {
  var fns = {};
  for (var key in req.files) {
    fns[key] = toBase64.bind(null, req.files[key].path);
  }
  async.parallel(fns, function (err, results) {
    if (err) {
      return next(err);
    }
    for (var key in results) {
      req.body[key] = results[key];
    }
    return next();
  });
};


module.exports.showForm = function (req, res, next) {
  return res.render('merchant/index');
};

module.exports.done = function (req, res, next) {
  return res.render('merchant/done');
};

module.exports.signup = function (req, res, next) {
  //submitting data
  var subscriptionUrl = config.mainApp.url + '/mmcs/merchant';
  request.post(subscriptionUrl, {
    'body': req.body,
    'json': true
  }, function (err, response, body) {
    if (err) {
      return next(err);
    }
    return res.redirect('/done');
  });
};
