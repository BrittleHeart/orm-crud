'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ban.hasOne(models.User, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      })
    }
  };
  Ban.init({
    banId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER.UNSIGNED,
    bannedAt: DataTypes.DATE,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Ban',
  });
  return Ban;
};