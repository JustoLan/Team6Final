const Product = require('../models/product');

const renderFilteredProducts = async (req, res) => {
  const { category, query } = req.query;
  console.log(Object.keys(Product));
  const products = await Product.searchProduct(query);

  let title = 'Todos los productos';
  let noProductsFoundMessage = 'No hay productos';
  if (query) {
    title = 'Resultados de búsqueda';
    noProductsFoundMessage =
      'No hay productos que sastisfagan tu términos de búsqueda';
  }

  if (category) {
    title += ` en la categoría "${category}"`;
  }

  console.log(products.price);

  res.render('products', {
    title,
    products,
    noProductsFoundMessage,
  });
};

const renderProductDetails = async (req, res) => {
    const product = await Product.findByPk(req.params.productId);
    const imageProduct = './public/images/uploadedForProduct/'+product.name
    res.render('detail', { product });
};

const renderProductCreateForm = (req, res) => {
  res.render('product-create-form');
};

const create = async (req, res) => {
  const {
    name,
    price,
    discountPercentage,
    category,
    description,
    image,
    talle,
  } = req.body;
  const product = await Product.create({
    name,
    price,
    discountPercentage,
    category,
    description,
    image,
    talle,
  });
  res.redirect(`/products/${product.dataValues.product_id}`);
};

const renderProductEditForm = async (req, res) => {
  const product = await Product.findByPk(req.params.productId);
  res.render('product-edit-form', { ropas: product });
};

const edit = async (req, res) => {
  const { name, price, discount, category, image, description } = req.body;

  console.log(13212313231);

  const updatedProduct = await Product.update({ name, price, discount, category, image, description }, {
    where: {
      product_id: req.params.productId,
    },
  });

  console.log(updatedProduct);

  res.render('detail', { product: updatedProduct });
};

const remove = async (req, res) => {
  await Product.destroy({
    where: {
      product_id: req.params.productId,
    },
  });
  res.redirect(`/products`);
};

module.exports = {
  renderFilteredProducts,
  renderProductDetails,
  renderProductCreateForm,
  create,
  renderProductEditForm,
  edit,
  remove,
};
