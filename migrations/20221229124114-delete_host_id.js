'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Guests', 'hostId')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Guests', 'hostId', {
      references: {
        key: 'id',
        model: 'Guests'
      },
      type: Sequelize.INTEGER,
      onDelete: "CASCADE"
    })
  }
};
