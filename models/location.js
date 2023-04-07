'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.belongsTo(models.User, {
        foreignKey: 'userID',
        targetKey: 'id',
      });
      models.User.hasMany(Location, {
        foreignKey: 'userID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Location.init({
    pays: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    quater: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};