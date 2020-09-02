const express = require('express');
const multer = require('multer');

const productsController = require('../controllers/products');
const requireSession = require('../middleware/require-session');

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

router.get('/create', requireSession, productsController.renderProductCreateForm);
router.post('/create', requireSession, upload.single('image'), productsController.create);

router.get('/:productId/edit', requireSession, productsController.renderProductEditForm);
router.patch('/:productId', requireSession, productsController.edit);

router.get('/:productId', productsController.renderProductDetails);

router.get('/:productId/remove', requireSession, productsController.remove);

module.exports = router;