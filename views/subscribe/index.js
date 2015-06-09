'use strict';

module.exports.createSubscription = [
  validate,
  subscribe
];

function validate(req, res, next) {
  req.checkBody('email').isEmail();
  next(req.validationErrors());
  // TODO: handle these errors better
}

function subscribe(req, res, next){
  //TODO: pass these to the main app somewhere
  res.redirect('/');
}
