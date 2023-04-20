'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timesheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Timesheet.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(Timesheet, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
      Timesheet.belongsTo(models.Job, {
        foreignKey: 'jobID',
        targetKey: 'id',
      });
      models.Job.hasMany(Timesheet, {
        foreignKey: 'jobID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Timesheet.init(
    {
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      status: DataTypes.STRING,
      jobID: DataTypes.INTEGER,
      percent: DataTypes.INTEGER,
      consultantID: DataTypes.INTEGER,
      flag: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Timesheet",
    }
  );
  return Timesheet;
};