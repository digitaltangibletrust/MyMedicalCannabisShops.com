'use strict';

var _ = require('lodash');

module.exports.show = function (req, res, next) {
  res.render('main/index');
};

module.exports.showPartner = function (req, res, next) {
  var partner = _.find(req.app.locals.offerData.partners, {
    'slug': req.params.slug
  });
  if (!partner) {
    return next();
  }

  res.render('main/partner', {
    'partner': partner
  });
};
