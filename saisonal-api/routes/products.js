var express = require('express');
var router = express.Router();

var products = require('../controllers/productController');


/*
* GET
* */

/* GET /products */
router.get('/', products.getAllProducts);

/* GET /products/month/3 */
router.get('/month/:month', products.getProductsOfMonth);

/* GET /products/id/asdfj23k2of9f32 */
router.get('/id/:productId', products.show);

/* GET /products/search?str=jona */
router.get('/search/:str', products.searchProductNames);




/*
* POST
* */

/* POST /products */
router.post('/', products.post);

/* PUT /products/af243ec243c2c23423  --> body: Datenobjekt */
router.put('/:productId', products.put);

/* DELETE /products/asdf22asf2far32 */
router.delete('/:productId', products.delete)


module.exports = router;
