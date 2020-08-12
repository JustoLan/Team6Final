// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
let {check, validationResult, body} = require("express-validator")

router.get('/', mainController.root); /* GET - home page */
router.get('/catmujer', mainController.catmujer); /* GET - categoria mujeres */
router.get('/cathombre', mainController.cathombre); /* GET - categoria hombres */
router.get('/search', mainController.search); /* GET - search results */
router.post('/register',[check('email').isEmail().withMessage("Mail no valido"), check('celular').isMobilePhone().withMessage("Celular no valido"), check('password1').isLength({min:6}).withMessage("La contraseña debe ser mayor a 6 caracteres"),body("password1","password2")], mainController.create)

module.exports = router;
