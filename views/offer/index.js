'use strict';
var _ = require('lodash');
var config = require('config');

module.exports.params = {
  'offer_id': function (req, res, next, id) {
    var offer = _.find(req.app.locals.offerData.offers, function (offer) {
      return offer.id === Number(id);
    });
    if (!offer) {
      return res.http404();
    }
    req.offer = offer;
    return next();
  }
};

module.exports.view = function (req, res, next) {
  return res.render('offer/offer', {
    'offer': req.offer
  });
};

module.exports.claim = function (req, res, next) {
  return res.redirect(config.mainApp.url + '/offer/' + req.offer.id + '/claim?t=' + Math.random());
};
