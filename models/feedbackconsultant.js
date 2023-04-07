'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedbackConsultant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeedbackConsultant.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(FeedbackConsultant, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  FeedbackConsultant.init({
    message: DataTypes.STRING,
    reply: DataTypes.STRING,
    consultantID: DataTypes.INTEGER,
    uploads: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FeedbackConsultant',
  });
  return FeedbackConsultant;
};