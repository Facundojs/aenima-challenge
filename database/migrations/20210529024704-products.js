'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products',{
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: Sequelize.DataTypes.STRING,
      price: Sequelize.DataTypes.DECIMAL,
      image: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};