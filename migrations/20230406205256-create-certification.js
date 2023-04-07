'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Certifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      certificationUrl: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      etablissement: {
        type: Sequelize.STRING
      },
      obtention_date: {
        type: Sequelize.DATE
      },
      consultantID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Consultants',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Certifications');
  }
};