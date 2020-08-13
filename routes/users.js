const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('uSuArIoS');
});

router.get('/register', usersController.renderRegisterForm);
router.post('/register', usersController.register);

router.get('/login', usersController.renderLoginForm);
router.post('/login', usersController.login);

router.get('/check', function(req, res){
  if(req.session.loggedUser == undefined) {
    res.send('undefined' + req.session)
  }
  else {
    res.send('logeado')
  }
});

router.post('/logout', usersController.logout);

module.exports = router;
