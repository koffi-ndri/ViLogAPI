'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Guests', 'hostId', {
      references: {
        model: 'Employees',
        key: 'id'
      },
      type: Sequelize.INTEGER,
      onDelete: "CASCADE"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Guests', 'hostId')
  }
};
