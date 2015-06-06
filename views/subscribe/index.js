'use strict';

module.exports.createSubscription = function (req, res, next) {
  req.checkBody('email').isEmail();
  var errs = req.validationErrors();
  if (errs && errs.length > 0) {
    return res.redirect('/');
  }
  req.app.db.Subscription.findOrCreate({
    'where': {
      'email': req.body.email
    }
  }).finally(function () {
    return res.redirect('/');
  });
};
