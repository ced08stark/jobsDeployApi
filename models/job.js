'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Projet, {
        foreignKey: 'projetID',
        targetKey: 'id',
      });
      models.Projet.hasMany(Job, {
        foreignKey: 'projetID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Job.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    projetID: DataTypes.INTEGER,
    logo: DataTypes.STRING,
    livrable_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};