'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compagny extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compagny.belongsTo(models.Employer, {
        foreignKey: 'employerID',
        targetKey: 'id',
      });
      models.Employer.hasMany(Compagny, {
        foreignKey: 'employerID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Compagny.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    description: DataTypes.STRING,
    email: DataTypes.STRING,
    facebookLK: DataTypes.STRING,
    twitterLK: DataTypes.STRING,
    instagramLK: DataTypes.STRING,
    culture: DataTypes.STRING,
    industry_type: DataTypes.STRING,
    size: DataTypes.STRING,
    website: DataTypes.STRING,
    employerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Compagny',
  });
  return Compagny;
};