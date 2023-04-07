'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employer.belongsTo(models.User, {
        foreignKey: 'userID',
        targetKey: 'id',
      });
      models.User.hasOne(Employer, {
        foreignKey: 'userID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Employer.init({
    role: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employer',
  });
  return Employer;
};