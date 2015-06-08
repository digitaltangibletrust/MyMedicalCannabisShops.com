'use strict';
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var mods = [
  'main',
  'store',
  'admin',
  'admin/api',
  'http',
  'subscribe'
];

var modLoader = require('./views/index.js');
var views = modLoader.load(mods);

module.exports.configure = function (app) {
  app.use(multipartMiddleware);
  app.get('/', views.main.show);
  app.post('/subscribe', views.subscribe.createSubscription);

  app.get('/admin/login', views.admin.loginShow);
  app.post('/admin/login', views.admin.login);

  //app.all('/admin*', views.admin.ensureAuthenticatedAdmin);
  app.get('/admin', views.admin.index);

  app.post('/admin/offers/upload', views.admin.updateOffers);
  app.post('/admin/stores/upload', views.admin.updateStores);
};
