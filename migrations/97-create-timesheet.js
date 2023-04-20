'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Timesheets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.STRING,
      },
      end_date: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      jobID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Jobs",
          key: "id",
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      consultantID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Consultants",
          key: "id",
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      flag: {
        type: Sequelize.STRING,
      },
      percent: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Timesheets');
  }
};