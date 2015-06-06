'use strict';

module.exports.show = function (req, res, next) {
  req.app.db.Offer.findAll().then(function (offers) {
    return res.render('main/index', {
      'offers': offers
    });
  }).catch(next)
};
