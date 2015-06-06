module.exports.subscribe = function (req, res, next) {
  req.checkBody('email').isEmail();
  var errs = req.validationErrors();
  if (errs && errs.length > 0) {
    return res.redirect('/');
  }
  req.app.db.Subscription.findOrCreate({
    'email': req.body.email
  }).complete(function () {
    return res.redirect('/');
  });
};
