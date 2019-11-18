const { Router } = require('express');
const jwt = require('jsonwebtoken');

const { UsersRepository } = require('../data/UserRepository');
const { errors } = require('../data/errors');
const config = require('../config/config');

const frontRouter = Router();

frontRouter.route(ensureAuthorized, getUser);

async function getUser(req, res, next) {
  const user_id = await UsersRepository.findUserIDByToken(req.token);
  req.body.user_id = user_id;
  next();
}

function ensureAuthorized(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];
    req.token = token;

    return jwt.verify(req.token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.json(errors.failedTokenAuth);
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  }

  return res.status(errors.notToken.status).json(errors.notToken.error);
}

module.exports = frontRouter;
