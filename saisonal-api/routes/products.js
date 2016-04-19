var express = require('express');
var router = express.Router();

var products = require('../controllers/productController');
var families = require('../controllers/productFamilyController');


/* # # # # # # # # # # # # #  PRODUCTS  # # # # # # # # # # # # # */
/*
* GET
* */

// GET /products
router.get('/', products.getAllProducts);

// GET /products/month/3
router.get('/month/:month', products.getProductsOfMonth);

// GET /products/id/asdfj23k2of9f32
router.get('/id/:productId', products.show);

// GET /products/search?str=jona
router.get('/search/:str', products.searchProductNames);

/*
* POST
* */

// POST /products
router.post('/', products.post);

// PUT /products/af243ec243c2c23423  --> body: Datenobjekt
router.put('/:productId', products.put);

// DELETE /products/asdf22asf2far32
router.delete('/:productId', products.delete)






/* # # # # # # # # # # # # #  PRODUCT FAMILIES  # # # # # # # # # # # # # */
/*
* GET
* */

// GET /products/families
router.get('/families', families.getAllFamilies);

// GET /products/family/ade2k34k2a3gr2
router.get('/families/:familyId', families.show);

/*
* POST
* */

// POST /products/family
router.post('/family', families.post);

// PUT /products/family/3sdf2323f24f2f
router.put('/family/:familyId', families.put);

// DELETE /products/family/132423f24f24f
router.delete('/family/:familyId', families.delete);



module.exports = router;
