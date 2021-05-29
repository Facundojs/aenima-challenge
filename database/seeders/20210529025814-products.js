"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("products", [{
      name: "Ryzen 5",
      price: 20000,
      image: null,
      description: "Un procesador Ryzen"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete("products", null, {});
     */
  }
};
