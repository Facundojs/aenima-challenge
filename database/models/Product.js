'use strict';

module.exports = function (sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING,
      },
      price: {
        type: dataTypes.DECIMAL,
      },
      image: {
        type: dataTypes.STRING,
      },
      description: {
        type: dataTypes.TEXT,
      },
    };
    let config = {
      tableName: "products",
      timestamps: false,
      paranoid: false,
    };
    let Product = sequelize.define(alias, cols, config);
    return Product;
  };