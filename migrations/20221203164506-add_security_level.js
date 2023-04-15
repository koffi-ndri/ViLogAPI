'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Employees', 'security_level', {
      references: {
        key: "id",
        model: "SecurityLevels"
      },
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Employees', 'security_level');
  }
};
