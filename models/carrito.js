const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database');

const Carrito = sequelize.define(
  'Carrito',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
    },
  }
);

Carrito.searchCarrito = function(query) {
  if (!query) {
    return this.findAll();
  }

  return this.findAll({
    where: {
      [Op.or]: [
        {
          user_id: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          product_id: {
            [Op.like]: `%${query}%`,
          },
        },
      ],
    },
  });
};

sequelize
  .sync()
  .then(() => console.log('Carrito table synchronized'))
  .catch((err) =>
    console.error('An error ocurred while synchronizing Carrito table', err)
  );
  
module.exports = Carrito;