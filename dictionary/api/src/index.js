const express = require('express');
const config = require('./config/config');
const startExpress = require('./config/express');
const db = require('./models');

const app = express();
startExpress(app, config);

function startApp() {
  app.listen(config.port);
}

db.sequelize
  .sync()
  .then(startApp)
  .catch(e => {
    throw new Error(e);
  });