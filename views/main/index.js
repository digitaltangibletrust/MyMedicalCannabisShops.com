'use strict';

module.exports.show = function (req, res, next) {
  var criteria = {
    'offers': {
      'where': {
        'active': true,
        'ending_at': {
          '$gte': new Date()
        }
      }
    },
    'stores': {}
  };
  req.app.db.Sequelize.Promise.all([
     req.app.db.Offer.findAll(criteria.offers),
     req.app.db.Store.findAll(criteria.stores)
    ]).then(function (results) {
    var offers = results[0];
    var stores = results[1];
    var offersSum = offers.reduce(function (acc, offer) {
      return acc + offer.value;
    }, 0);

    return res.render('main/index', {
      'offers': offers,
      'offersSum': offersSum,
      'stores': stores
    });
  }).catch(next);
};
