const User = require('../models/user');
const bcrypt = require('bcrypt');

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

const renderLoginForm = (req, res) => {
  res.render('login');
};
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isPasswordValid = await validPassword(password, user.dataValues. password) 

  if (isPasswordValid) {
    res.cookie('user_sid', user.dataValues.id, { maxAge: 900000 });
    res.redirect('/');
  } else {
    res.redirect('/users/login');
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

module.exports = {
  renderRegisterForm,
  register,
  renderLoginForm,
  login,
  logout,
};
