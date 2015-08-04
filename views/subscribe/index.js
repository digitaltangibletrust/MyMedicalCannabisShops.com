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
  req.checkBody('zip').isNumeric().isLength(5);
  next(req.validationErrors());
}

function validationError(err, req, res, next) {
  if (req.xhr) {
    return res.json(400, {
      'success': false,
      'errors': err
    });
  }

  res.render('subscribe/validation', {
    'errors': err
  });
}

function subscribe(req, res, next) {
  var subscriptionUrl = config.mainApp.url + '/mmcs';
  request.post(subscriptionUrl, {
    'body': {
      'email': req.body.email,
      'zip': req.body.zip
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
  if (req.xhr) {
    return res.json({
      'success': true
    });
  }
  res.render('subscribe/success');
}
