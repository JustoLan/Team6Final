const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.CHAR,
  },
  price: {
    type: DataTypes.SMALLINT,
  },
  discountPercentage: {
    type: DataTypes.TINYINT,
  },
  category: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.BLOB,
  },
  talle: {
    type: DataTypes.STRING,
  },
  tag: {
    type: DataTypes.STRING,
  },
});

Product.associate  = function(models) {
  Product.belongsToMany(models.User, {
    as: "users",
    through: "carrito",
    foreingKey: "product_id",
    otherKey: "user_id",
    timestamps: false
  });
},



Product.searchProduct = function(query) {
  if (!query) {
    return this.findAll();
  }

  return this.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${query}%`,
          },
        },
      ],
    },
  });
};

sequelize
  .sync()
  .then(() => console.log('Product table synchronized'))
  .catch((err) =>
    console.error('An error ocurred while synchronizing Product table', err)
  );

module.exports = Product;
