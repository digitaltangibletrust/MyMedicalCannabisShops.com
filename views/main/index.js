'use strict';

var _ = require('lodash');


module.exports.params = {
  'partner_slug': function (req, res, next, id) {
    var partner = _.find(req.app.locals.offerData.partners, {
      'slug': id
    });
    if (!partner) {
      return res.http404();
    }
    req.partner = partner;
    return next();
  }
};



module.exports.show = function (req, res, next) {
  res.locals.total = _.reduce(req.app.locals.offerData.offers, function (sum, offer) {
    return sum += offer.value;
  }, 0);

  res.render('main/index');
};

module.exports.showPartner = function (req, res, next) {
  if (!req.partner) {
    return next();
  }

  res.render('main/partner', {
    'partner': req.partner
  });
};
