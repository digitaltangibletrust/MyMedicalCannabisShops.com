'use strict';

// var config = require('config');
// var request = require('request');

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
  // TODO: POST email to mainApp which will trigger mailchimp subscription
  next();
}

function success(req, res, next) {
  res.render('subscribe/success');
}
