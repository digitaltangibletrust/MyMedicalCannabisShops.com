'use strict';

var config = require('config');
var request = require('request');

module.exports.createSubscription = [
  validate,
  validationError,
  subscribe,
  success
];

function validate(req, res, next) {
  req.checkBody('email').isEmail();
  next(req.validationErrors());
}

function validationError(err, req, res, next) {
  res.render('subscribe/validation', {
    'errors': err
  });
}

function subscribe(req, res, next) {
  var subscriptionUrl = config.mainApp.url + '/mmcs';
  request.post(subscriptionUrl, {
    'body': {
      'email': req.body.email
    },
    'json': true
  }, function (err, response, body) {
    if (err) {
      return next(err);
    }

    // TODO: handle possible errors in the response body
    next();
  });
}

function success(req, res, next) {
  res.render('subscribe/success');
}
