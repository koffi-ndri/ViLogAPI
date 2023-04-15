'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      profession: {
        type: Sequelize.STRING
      },
      time_in: {
        type: Sequelize.DATE
      },
      time_out: {
        type: Sequelize.DATE
      },
      isSignedIn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      hostId: {
        references: {
          key: "id",
          model: "Guests"
        },
        type: Sequelize.INTEGER,
        onDelete: "CASCADE"
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
    await queryInterface.dropTable('Guests');
  }
};