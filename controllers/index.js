const Product = require('../models/product');

const renderIndex = (req, res, next) => {
  const womenProducts = Product.findAll({ where: { category: 'mujer' } });
  const menProducts = Product.findAll({ where: { category: 'hombre' } });
  res.render('index', { womenProducts, menProducts });
};

module.exports = {
  renderIndex,
};