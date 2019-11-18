const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const db = require('../models');
const config = require('../config/config');
const { errors } = require('./errors');

const deleteAllConfig = {
  where: {
    id: {
      $gte: 1,
    },
  },
};

class UsersRepository {
  static async findByCredentials({ email, password }) {
    const user = await db.user.findOne({
      attributes: ['id', 'password', 'email'],
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(errors.notFound);
    }

    const isValidPassword = bcrypt.compareSync(
      password,
      user.dataValues.password,
    );

    if (!isValidPassword) {
      throw new Error(errors.invalidPassword);
    }

    return user;
  }

  static async findUserIDByToken(token) {
    const response = await db.token.findOne({
      attributes: ['user_id'],
      where: {
        token: token,
      },
    });

    return response.dataValues.user_id;
  }

  static async addUser({ email, password }) {
    const {
      dataValues: { id },
    } = await db.user.create(
      {
        email,
        password: this.generateHash(password),
      },
      {
        fields: ['email', 'password'],
      },
    );

    const token = await UsersRepository.generateUserToken({ id, email });

    return {
      id,
      email,
      token,
    };
  }

  static async generateUserToken(user) {
    const { id } = user;
    const { jwtSecret, jwtConfig } = config;
    const token = jwt.sign(user, jwtSecret, jwtConfig);

    await UsersRepository.deleteOldToken(id);
    const { dataValues } = await db.token.create(
      {
        user_id: id,
        token,
      },
      {
        fields: ['user_id', 'token'],
      },
    );

    return dataValues.token;
  }

  static getAllUsers() {
    return db.user.findAll();
  }
  static getAllTokens() {
    return db.token.findAll();
  }
  static deleteAllUsers() {
    return db.user.destroy(deleteAllConfig);
  }
  static deleteAllTokens() {
    return db.token.destroy(deleteAllConfig);
  }

  static deleteOldToken(user_id) {
    return db.token.destroy({
      where: {
        user_id,
      },
    });
  }

  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
}

module.exports = {
  UsersRepository,
};
