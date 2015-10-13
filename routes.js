'use strict';
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var mods = [
  'main',
  'http',
  'subscribe',
  'offer',
  'special',
  'privacy',
  'merchant'
];

var modLoader = require('./views/index.js');
var views = modLoader.load(mods);


var merchantSignupStack = [multipartMiddleware, views.merchant.processUploads, views.merchant.signup];

module.exports.configure = function (app) {
  views.setupParams(app);
  app.get('/', views.main.show);
  app.get('/partner/:partner_slug', views.main.showPartner);

  app.get('/i-am-merchant', views.merchant.showForm);
  app.post('/signup', merchantSignupStack);
  app.get('/done', views.merchant.done);

  app.post('/subscribe', views.subscribe.createSubscription);

  app.get('/offer/:offer_id', views.offer.view);
  app.get('/offer/:offer_id/claim', views.offer.claim);

  app.get('/privacy', views.privacy.init);
  // custom
  app.get('/alldae-24-hour-payday-deal', views.special.alldae);


  app.all('*', views.http.http404);
};
