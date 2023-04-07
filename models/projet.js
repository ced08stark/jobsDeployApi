'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Projet.belongsTo(models.Employer, {
        foreignKey: 'employerID',
        targetKey: 'id',
      });
      models.Employer.hasMany(Projet, {
        foreignKey: 'employerID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Projet.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    description: DataTypes.STRING,
    employerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Projet',
  });
  return Projet;
};