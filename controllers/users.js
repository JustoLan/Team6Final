const User = require('../models/user');
const bcrypt = require('bcrypt');
const Carrito = require('../models/carrito');
const session = require('express-session');
const { query } = require('../database');

// No tngo tioempo para esto
const validPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const renderRegisterForm = (req, res) => {
  res.render('register', { errors: [] });
};

const register = async (req, res) => {
  const {
    name,
    surname,
    sex,
    email,
    cellphone,
    password,
    passwordCheck,
    acceptedTermsOfService,
  } = req.body;

  try {
    const user = await User.create({
      name,
      surname,
      sex,
      email,
      cellphone,
      password,
      passwordCheck,
      acceptedTermsOfService,
    });

    res.cookie('user_sid', user.dataValues.id, { maxAge: 900000, httpOnly: true });
    res.redirect('/');

  } catch (error) {
    console.log(error)
    res.redirect('/users/register');
  }

};

const addToCart = (req, res) => {
  
};

const renderLoginForm = (req, res) => {
  res.render('login');
};
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isPasswordValid = await validPassword(password, user.dataValues. password)

  if (isPasswordValid) {
    console.log(user.dataValues.name)
    res.cookie('user_id', user.dataValues.user_id, { maxAge: 900000 });
    req.session.userId = user.dataValues.user_id;
    res.cookie('user_name', user.dataValues.name, { maxAge: 900000 });
    res.redirect('/');
  } else {
    res.redirect('/users/login');
    res.cookie('Non valid', "algo", { maxAge: 900000 });
  }
};

const logout = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
};

const carritoPersonal = (req, res) => {

  const userId = req.session.userId;

  console.log = userId + "ajshdasdhauisdjasdhaisbdkjahsjdhasjdhiasbdabsjkdhajsdhajksdjabsdkas";

  const { category, query } = req.query;

  //habia un await antes de "carrito.search..." pero por alguna razon rompia algo
  const products = Carrito.searchCarrito(query);

  let title = 'Productos' + userId;
  let noProductsFoundMessage = 'No hay productos en el carrito';
  if (query) {
    title = 'Carrito de ' + query;
    noProductsFoundMessage = 'No hay productos en este carrito'
   }

  res.render('carrito', {
    title,
    products,
    noProductsFoundMessage,
  });
};

module.exports = {
  renderRegisterForm,
  register,
  renderLoginForm,
  login,
  logout,
  carritoPersonal,
  addToCart,
};
