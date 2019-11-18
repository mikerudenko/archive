const path =  require('path');
const express = require('express');
const bodyParser =  require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');

const config = require('./config');
const initControllers = require('../controllers');

module.exports = function(app) {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(compression());
  app.use(express.static(config.root + '/views/'));
  app.use(methodOverride());

  app.use(cors());
  initControllers(app);
};
