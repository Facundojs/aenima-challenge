"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("products", [
      {
      name: "AMD RYZEN 3 3200G ",
      price: 12980,
      image: "RYZEN_3.jpg",
      description: "Un procesador Ryzen"
      },
      {
      name: "AMD Ryzen 5 5600X",
      price: 34270,
      image: "RYZEN_5.jpg",
      description: "Un procesador Ryzen bueno"
      },
      {
      name: "AMD Ryzen 7 5800X",
      price: 57050,
      image: "RYZEN_7.jpg",
      description: "Un procesador Ryzen muy bueno"
      },
      {
      name: "AMD Ryzen 9 5950X",
      price: 106920,
      image: "RYZEN_9.jpg",
      description: "Un procesador Ryzen de alta gama"
      },
      {
      name: "Intel Core i3 9100",
      price: 13587,
      image: "INTEL_3.jpg",
      description: "Un procesador Intel"
      },
      {
      name: "Intel Core i5 9600K",
      price: 31320,
      image: "INTEL_5.jpg",
      description: "Un procesador Intel bueno"
      },
      {
      name: "Intel Core i7 9700F",
      price: 40525,
      image: "INTEL_7.jpg",
      description: "Un procesador Intel muy bueno"
      },
      {
      name: "Intel Core i9 10900KF",
      price: 55150,
      image: "INTEL_9.jpg",
      description: "Un procesador Intel de alta gama"
      },
    ], {});
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
