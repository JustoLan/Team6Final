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

// TODO ACACACACACAC
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

    req.session.user = user.dataValues;
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

// TODO ACACACACACAC
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.redirect('/users/login');
  }

  const isPasswordValid = await validPassword(password, user.dataValues.password)

  if (!isPasswordValid) {
    return res.redirect('/users/login');
  } else {
    console.log(user.dataValues);
    req.session.user = user.dataValues;
    res.redirect('/');
  }
};

const logout = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/users/login');
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
