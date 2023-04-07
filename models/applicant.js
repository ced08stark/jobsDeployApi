'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applicant.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(Applicant, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
      Applicant.belongsTo(models.Job, {
        foreignKey: 'jobID',
        targetKey: 'id',
      });
      models.Job.hasMany(Applicant, {
        foreignKey: 'jobID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Applicant.init({
    jobID: DataTypes.INTEGER,
    consultantID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Applicant',
  });
  return Applicant;
};