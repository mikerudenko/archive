module.exports = function(sequelize, DataTypes) {
  return sequelize.define('word', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    word: {
      type: DataTypes.STRING,
    },
    transcription: {
      type: DataTypes.STRING,
    },
    translation: {
      type: DataTypes.STRING,
    },
  });
};
