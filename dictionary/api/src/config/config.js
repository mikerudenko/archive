const path = require('path');
const rootPath = path.normalize(path.resolve(__dirname, '..'));

module.exports = {
  root: rootPath,
  port: 3001,
  jwtSecret: 'shdjcvqyitwus12345behrqwygiudh343ert34eqw+_)(&^',
  jwtConfig: {
    algorithm: 'HS256',
    expiresIn: '1h'
  },
  db: {
    database: 'dictionary',
    user: 'root',
    password: '111',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 100,
        min: 0,
        idle: 10000
      },
      define: {
        freezeTableName: true,
        timestamps: false,
        underscored: true
      }
    }
  }
};
