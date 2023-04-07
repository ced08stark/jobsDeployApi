'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoftSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SoftSkill.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(SoftSkill, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  SoftSkill.init({
    name: DataTypes.STRING,
    consultantID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SoftSkill',
  });
  return SoftSkill;
};