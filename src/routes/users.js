var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController.js')
var app = express();

//router.get('/profile', userController.userProfile);
router.get('/register', userController.register);
//router.post('/register', userController.create) NO LO PUDE HACER FUNCIONAR DESDE ESTA RUTA
router.get('/login', userController.login); 
//router.post('/login', userController.userLogin)

module.exports = router;
