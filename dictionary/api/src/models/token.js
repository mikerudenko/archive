module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'token',
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
      token: {
        type: DataTypes.STRING,
      },
    },
  );
};
