const express = require('express');

const requireSession = require('../middleware/require-session');
const loggedInRedirect = require('../middleware/logged-in-redirect');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('uSuArIoS');
});

router.get('/register', loggedInRedirect, usersController.renderRegisterForm);
router.post('/register', loggedInRedirect, usersController.register);

router.get('/login', loggedInRedirect, usersController.renderLoginForm);
router.post('/login', loggedInRedirect, usersController.login);

router.get('/carrito', requireSession, usersController.carritoPersonal);

router.get('/addToCart', requireSession, usersController.addToCart);

router.get('/check', function(req, res){
  if(req.session.loggedUser == undefined) {
    res.send('undefined' + req.session)
  }
  else {
    res.send('logeado')
  }
});

router.post('/logout', requireSession, usersController.logout);

module.exports = router;
