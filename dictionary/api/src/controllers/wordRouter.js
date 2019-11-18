const { Router } = require('express');
const { WordRepository } = require('../data/WordRepository');
const { sendErrorResponse } = require('../utils/utils');
const wordRouter = Router();

wordRouter
  .route('/')
  .get(getUserWords)
  .post(createWord)
  .patch(updateUserWord)
  .delete(deleteUserWord);

wordRouter.delete('/deleteAll', deleteAll);

async function getUserWords(
  { query: { offset, limit }, body: { user_id } },
  res,
) {
  const body = {
    offset: Number(offset),
    limit: Number(limit),
    user_id: Number(user_id),
  };

  const count = await WordRepository.getUserWordsCount(body);
  const words = await WordRepository.getUserWords(body);
  return res.json({ words, count });
}

async function createWord({ body }, res) {
  try {
    const word = await WordRepository.createWordForUser(body);
    return res.json(word);
  } catch (e) {
    return sendErrorResponse(e, res);
  }
}

async function updateUserWord(req, res) {
  try {
    await WordRepository.updateWord(req.body);
    return res.status(200);
  } catch (error) {
    return sendErrorResponse(e, res);
  }
}

async function deleteUserWord(req, res) {
  const word = await WordRepository.deleteUserWord(req.body.id);
  return res.json(word);
}

async function deleteAll(req, res) {
  const response = await WordRepository.deleteAllUserWords(req.body.user_id);
  return res.json(response);
}

module.exports = wordRouter;
