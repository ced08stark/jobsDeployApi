'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedbackEmployer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeedbackEmployer.belongsTo(models.Employer, {
        foreignKey: 'employerID',
        targetKey: 'id',
      });
      models.Employer.hasMany(FeedbackEmployer, {
        foreignKey: 'employerID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  FeedbackEmployer.init({
    message: DataTypes.STRING,
    reply: DataTypes.STRING,
    employerID: DataTypes.INTEGER,
    uploads: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FeedbackEmployer',
  });
  return FeedbackEmployer;
};