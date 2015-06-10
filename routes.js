'use strict';
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var mods = [
  'main',
  'http',
  'subscribe'
];

var modLoader = require('./views/index.js');
var views = modLoader.load(mods);

module.exports.configure = function (app) {
  app.use(multipartMiddleware);
  app.get('/', views.main.show);
  app.post('/subscribe', views.subscribe.createSubscription);
  app.all('*', views.http.http404);
};
