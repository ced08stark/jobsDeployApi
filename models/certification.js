'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Certification.belongsTo(models.Consultant, {
        foreignKey: 'consultantID',
        targetKey: 'id',
      });
      models.Consultant.hasMany(Certification, {
        foreignKey: 'consultantID',
        sourceKey:'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Certification.init({
    name: DataTypes.STRING,
    certificationUrl: DataTypes.STRING,
    picture: DataTypes.STRING,
    etablissement: DataTypes.STRING,
    consultantID: DataTypes.INTEGER,
    obtention_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Certification',
  });
  return Certification;
};