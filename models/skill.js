'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(Skill, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Skill.init({
    name: DataTypes.STRING,
    consultantID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};