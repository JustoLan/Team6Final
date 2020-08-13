const express = require('express');
const productsController = require('../controllers/products');
const multer = require('multer');
const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/images/uploadedForProduct')
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname)
        }
});
const upload = multer({storage});

const router = express.Router();

router.get('/', productsController.renderFilteredProducts);

router.get('/create', productsController.renderProductCreateForm);
router.post('/create', upload.single('image'), productsController.create);

router.get('/:productId/edit', productsController.renderProductEditForm);
router.patch('/:productId', productsController.edit);

router.get('/:productId', productsController.renderProductDetails);

router.get('/:productId/remove', productsController.remove);

module.exports = router;