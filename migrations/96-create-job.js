'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      type: {
        type: Sequelize.STRING,
      },
      projetID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Projets",
          key: "id",
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      experience: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      skill: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      certification: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      langue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isWorkTeam: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contratType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      workPreference: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      delay: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      file: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      montant: {
        allowNull: false,
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('Jobs');
  }
};

