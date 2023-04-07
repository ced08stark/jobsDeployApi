'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compagnies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      logo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      description: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      facebookLK: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      twitterLK: {
        type: Sequelize.STRING,
        allowNull:true
      },
      instagramLK: {
        type: Sequelize.STRING,
        allowNull:true
      },
      culture: {
        type: Sequelize.STRING
      },
      industry_type: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING,
        allowNull:true
      },
      employerID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employers',
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
    await queryInterface.dropTable('Compagnies');
  }
};