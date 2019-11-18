module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user_word',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
        },
      },
      word_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'word',
        },
      },
      is_changed: {
        type: DataTypes.BOOLEAN,
      },
    },
  );
};
