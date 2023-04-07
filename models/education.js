'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(Education, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Education.init({
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    etablissement: DataTypes.STRING,
    logo: DataTypes.STRING,
    diplome: DataTypes.STRING,
    consultantID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};