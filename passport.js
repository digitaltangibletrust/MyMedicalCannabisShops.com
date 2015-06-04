'use strict';
var _ = require('lodash');

exports = module.exports = function (app, passport) {
  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    function (username, password, done) {
      var conditions = {
        "isActive": true
      };

      if (username.indexOf('@') === -1) {
        conditions.username = {
          'ilike': username
        };
      } else {
        conditions.email = {
          'ilike': username
        };
      }

      app.db.User.find({
        "where": conditions
      }).complete(function (err, user) {
        if (err) {
          return done(null, false, {
            message: "Error finding user"
          });
        }

        if (!user) {
          return done(null, false, {
            "message": "Unknown user or incorrect password"
          });
        }

        app.db.User.validatePassword(password, user.password, function (err, isValid) {
          if (err) {
            return done(err);
          }

          if (!isValid) {
            return done(null, false, {
              message: 'Invalid password'
            });
          }

          return done(null, user);
        });
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    return app.db.User.loadUser(id).complete(done);
  });

  // For an explanation of linking accounts together see (it's really the req parameter that is the key):
  //    http://scotch.io/tutorials/javascript/easy-node-authentication-linking-all-accounts-together
  var CoinbaseStrategy = require('passport-coinbase').Strategy;
  passport.use(new CoinbaseStrategy({
      clientID: app.config.coinbase.clientID,
      clientSecret: app.config.coinbase.clientSecret,
      callbackURL: app.config.coinbase.callbackURL,
      scope: ['user', 'addresses', 'buy', 'sell', 'send', 'transactions', 'transfers'],
      passReqToCallback: true,
      tailParam: '&meta[send_limit_amount]=100&meta[send_limit_period]=day'
    },
    function (req, accessToken, refreshToken, profile, done) {
      if (!req.user) {
        return done('An authenticated DT user must be provided to utilize coinbase');
      }

      req.app.db.Partner.find({
        'where': {
          'id': req.app.config.partnerIds.COINBASE
        }
      }).complete(function (err, coinbase) {
        if (err) {
          return done(err);
        }

        req.user.addTradingPartner(coinbase).complete(function (err, coinbase) {
          if (err) {
            return done(err);
          }

          req.user.loadUser().complete(function (err, user) {
            if (err) {
              return done(err);
            }

            req.user = user;
            var coinbase = _.find(req.user.TradingPartners, ({
              'id': req.app.config.partnerIds.COINBASE
            }));

            coinbase.ExternalAccountDetails.accessKey = accessToken;
            coinbase.ExternalAccountDetails.refreshToken = refreshToken;
            coinbase.ExternalAccountDetails.profile = JSON.stringify(profile);
            coinbase.ExternalAccountDetails.authType = 'OAUTH2';

            coinbase.ExternalAccountDetails.save().complete(function (err, results) {
              if (err) {
                return done(err);
              }
              req.logAction(req.actions.INTEGRATE_ACCOUNT, {
                'INTEGRATE_ACCOUNT': 'coinbase'
              });
              done(null, req.user);
            });
          });
        });
      });
    }
  ));
};
