const { Router } = require('express');
const { UsersRepository } = require('../data/UserRepository');
const { sendErrorResponse } = require('../utils/utils');

const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);

async function signUp(req, res) {
  try {
    await UsersRepository.findByCredentials(req.body);
    const user = await UsersRepository.addUser(req.body);
    return res.json(user);
  } catch (e) {
    return sendErrorResponse(e, res);
  }
}

async function login(req, res) {
  try {
    const user = await UsersRepository.findByCredentials(req.body);
    const { id, email } = user.dataValues;
    const token = await UsersRepository.generateUserToken({ id, email });
    return res.json({ ...req.body, token });
  } catch (e) {
    return sendErrorResponse(e, res);
  }
}

module.exports = userRouter;