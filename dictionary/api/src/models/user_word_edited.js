module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user_word_edited',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      user_word_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'word',
        },
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
    },
  );
};
