'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('SecurityLevels',[
    {
      id: 1,
      type: "Host",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      type: "Administrator",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SecurityLevels', null, {})
  }
};
