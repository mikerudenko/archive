const userRouter = require('./userRouter');
const wordRouter = require('./wordRouter');
const frontRouter = require('./frontRouter');
const { initBots } = require('./botController');

module.exports = function initControllers(app) {
  // initBots();

  app.use('/', userRouter);
  app.use('/api/*', frontRouter);
  app.use('/api/word', wordRouter);

  app.use(function(err, req, res, next) {
    return res.status(500).json({
      error: err.error,
    });
  });
};
