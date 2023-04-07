'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consultant.belongsTo(models.User, {
        foreignKey: 'userID',
        targetKey: 'id',
      });
      models.User.hasOne(Consultant, {
        foreignKey: 'userID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Consultant.init({
    pseudo: DataTypes.STRING,
    role: DataTypes.STRING,
    remunaration: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Consultant',
  });
  return Consultant;
};