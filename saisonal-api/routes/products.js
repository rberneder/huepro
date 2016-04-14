var express = require('express');
var router = express.Router();

var products = require('../controllers/productController');

/* POST /products */
router.post('/', products.post);

/* GET /products */
router.get('/', products.get);

/* GET /products/asdfj23k2of9f32 */
router.get('/:productId', products.show);

/* PUT /products/af243ec243c2c23423  --> body: Datenobjekt */
router.put('/:productId', products.put);

/* DELETE /products/asdf22asf2far32 */
router.delete('/:productId', products.delete)


module.exports = router;
