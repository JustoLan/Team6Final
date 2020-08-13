const express = require('express');
const indexController = require('../controllers/index');
const usersRouter = require('./users');
const productsRouter = require('./products');

const router = express.Router();

/* GET home page. */
router.get('/', indexController.renderIndex);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

module.exports = router;
