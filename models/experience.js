'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Experience.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(Experience, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Experience.init({
    start_date: DataTypes.DATE,
    compagny_name: DataTypes.STRING,
    isCurrent: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    consultantID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Experience',
  });
  return Experience;
};