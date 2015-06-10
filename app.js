'use strict';
var config = require('config');
var express = require('express');
var helmet = require('helmet');
var _ = require('lodash');
var path = require('path');
var numeral = require('numeral');
// var session = require('express-session');
var morgan = require('morgan');
var requestValidator = require('express-validator');
var compression = require('compression');
// var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var errorHandler = require('errorhandler');
var httpHelpers = require('./views/http/index.js');

//create express app
var app = express();

//setup basedir for jade paths
app.locals.basedir = path.join(__dirname, '/');

//config express in all environments
app.disable('x-powered-by');
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('project-name', config.projectName);
app.set('company-name', config.companyName);
app.set('system-email', config.systemEmail);
app.set('require-account-verification', config.requireAccountVerification);
app.set('send-welcome-email', config.sendWelcomeEmail);
app.set('subscribe-to-mailing-list', config.subscribeToMailingList);

//trust proxy for getting client IP behind nginx
app.enable('trust proxy');

//smtp settings
app.set('smtp-from-name', config.smtp.from.name);
app.set('smtp-from-address', config.smtp.from.address);
app.set('smtp-credentials', config.smtp.credentials);

//middleware
app.use(morgan(config.app.morgan.alias));
app.use(compression(config.app.compression));
//app.use(favicon(config.app.favicon.path));
app.use(serveStatic(config.app.serveStatic.path));
app.use(bodyParser.urlencoded({
  'extended': false
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method')); // Microsoft 
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData 
app.use(methodOverride('X-Method-Override')); // IBM 

app.use(Cookies.express(['array', 'of', 'security', 'keys', 'for', 'keygrip']));
app.use(requestValidator());
app.use(helmet());

//early 404 helper
app.use(function (req, res, next) {
  res.http404 = httpHelpers.http404.bind(null, req, res);
  next();
});

//all validation errors from express.validator go here
app.use(function (err, req, res, next) {
  if (Array.isArray(err)) {
    //TODO: render it
    console.dir(err);
    return next(err);
  } else {
    return next(err);
  }
});

app.use(httpHelpers.http500);

//global locals
app.locals.projectName = app.get('project-name');
app.locals.copyrightYear = new Date().getFullYear();
app.locals.copyrightName = app.get('company-name');
app.locals.cacheBreaker = 'br34k-52';

//templating helpers
app.locals.format = {
  'currency': function (val, precision) {
    precision = precision !== undefined ? precision : 2;

    var zeroes = _.times(precision, function () {
      return '0';
    }).join('');

    return '$' + numeral(val || 0).format('0,0.' + zeroes);
  },
  'percentage': function (val) {
    return numeral(val).format('0.00%');
  }
};

// DATA for use in templates
require('./data.js')(app);
app.locals.config = config;

//config express in dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

//route requests
require('./routes').configure(app);

//setup hipchat
//require('lib/hipchat')(config, app);

//listen up
app.listen(app.get('port'), function () {
  //and... we're live
  console.log('application live on ' + app.get('port'));
});
