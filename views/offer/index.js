'use strict';
var _ = require('lodash');

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
  return res.json(req.offer);
};
module.exports.redeem = function (req, res, next) {

};
