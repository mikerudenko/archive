const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');

const db = {};
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.token.belongsTo(db.user, { foreignKey: 'user_id' });

db.user_word.belongsTo(db.user, { foreignKey: 'user_id' });
db.user_word.belongsTo(db.word, { foreignKey: 'word_id' });
db.user_word.hasMany(db.user_word_edited, { foreignKey: 'user_word_id' });

db.user_word_edited.belongsTo(db.user_word, { foreignKey: 'user_word_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports =  db;
