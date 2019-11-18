const db = require('../models');
const { TranslationRepository } = require('./TranslationRepository');
const { errors } = require('./errors');


class WordRepository {
  static async createWordForUser({ user_id, word: text }) {
    const word = await WordRepository.getWord(text);

    if (word !== null) {
      return WordRepository.creatExistedUserWord({ user_id, word });
    }

    const translatedWord = await TranslationRepository.getWordData(
      encodeURIComponent(text),
    );

    const { id } = await WordRepository.saveWordInDB(translatedWord);
    const savedWord = await WordRepository.saveUserWord({
      user_id,
      word_id: id,
    });

    return {
      ...translatedWord,
      id: savedWord.id,
    };
  }

  static async creatExistedUserWord({ user_id, word }) {
    const params = {
      user_id,
      word_id: word.id,
    };

    const isWordInUserDictionary = await WordRepository.getUserWord(params);

    if (isWordInUserDictionary !== null) {
      throw new Error(errors.wordInDictionary);
    }

    const { id } = await WordRepository.saveUserWord(params);

    return {
      ...word,
      id,
    };
  }

  static getWordById(id) {
    return db.word.findOne({
      where: { id },
    });
  }

  static getUserWordsCount({ user_id }) {
    return  db.user_word.count({ where: { user_id } });
  }

  static userWordsMapper(userWord) {
    userWord = JSON.parse(JSON.stringify(userWord));

    if (userWord.is_changed) {
      delete userWord.user_word_editeds[0].user_word_id;

      return {
        ...userWord.user_word_editeds[0],
        id: userWord.id,
      };
    }

    return {
      ...userWord.word,
      id: userWord.id,
    };
  }

  static async getUserWords({ offset, limit, user_id }) {
    const userWords = await db.user_word.findAll({
      offset,
      limit,
      where: {
        user_id,
      },
      order: [['id', 'DESC']],
      include: [{ model: db.word }, { model: db.user_word_edited }],
    });

    return userWords.map(WordRepository.userWordsMapper);
  }

  static deleteUserWord(id) {
    return db.user_word.destroy({ where: { id } });
  } 
  static deleteAllUserWords(user_id) {
    return db.user_word.destroy({ where: { user_id } });
  }

  static getUserWordEdited({ user_word_id }) {
    return db.user_word_edited.findOne({
      where: { user_word_id },
    });
  }

  static async updateWord(data) {
    const word = await WordRepository.getUserWordEdited(data);

    if (!word) {
      await WordRepository.createUserWordEdited(data);
      WordRepository.updateUserWordChangeStatus(data);
    } else {
      WordRepository.updateUserWordEdited(data);
    }
  }

  static updateUserWordEdited({ user_word_id }) {
    return db.user_word_edited.update(data, {
      where: {
        user_word_id,
      },
    });
  }

  static updateUserWordChangeStatus({ user_word_id }) {
    return db.user_word.update(
      { is_changed: true },
      {
        where: {
          id: user_word_id,
        },
      },
    );
  }

  static saveWordInDB(data) {
    return db.word.create(data);
  }
  static createUserWordEdited(data) {
    return db.user_word_edited.create(data);
  }

  static async getWord(word) {
    return await db.word.findOne({
      where: { word },
    });
  }

  static getUserWord(where) {
    return db.user_word.findOne({ where });
  }
  static saveUserWord(data) {
    return db.user_word.create({ ...data, is_changed: false });
  }
    
}

module.exports = {
  WordRepository,
}