'use strict';
var fs = require('fs');
var _ = require('lodash');

module.exports.ensureAuthenticatedAdmin = function (req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.redirect('/admin/login');
  }
};
module.exports.index = function (req, res, next) {
  return res.render('admin/index');
};

module.exports.login = function (req, res, next) {

};
module.exports.loginShow = function (req, res, next) {

};


module.exports.updateOffers = function (req, res, next) {
  try {
    var offers = JSON.parse(fs.readFileSync(req.files.offers.path));
  } catch (e) {
    return next(e);
  }
  var stores = _.unique(_.pluck(offers, 'store'));
  var storesQueris = stores.map(function (store) {
    return req.app.db.Store.findOne({
      'where': {
        'name': store
      }
    });
  });
  req.app.db.Sequelize.Promise.all(storesQueris).then(function (stores) {

  }).catch(next);
  return;
  var stores = offers.map(function (offer) {
    return req.app.db.Store.find({
      'where': {
        'name': offer.store
      }
    });
  });

  req.app.db.Sequelize.Promise.all(stores).then(function (stores) {

  });
  var queries = offers.map(function (offer) {
    return req.app.db.Offer.findOrCreate({
      'where': {
        'url': offer.url
      }
    });
  });

  if (req.body.action_method === 'replace') {
    queries.unshift(req.app.db.Offer.destroy({
      'where': {}
    }));
  }
  req.app.db.Sequelize.Promise.all(queries).then(function (offers) {
    return res.redirect('/');
  }).catch(next).finally(function cleanup() {
    fs.unlinkSync(req.files.offers.path);
  });
};

module.exports.updateStores = function (req, res, next) {
  try {
    var stores = JSON.parse(fs.readFileSync(req.files.stores.path));
  } catch (e) {
    return next(e);
  }
  req.app.db.Store.destroy({
    'where': {}
  }).then(function () {
    var queries = stores.map(function (store) {
      return req.app.db.Store.create(store);
    });
    req.app.db.Sequelize.Promise.all(queries).then(function () {
      return res.redirect('/admin/?success=true');
    });
  }).catch(next);
};
