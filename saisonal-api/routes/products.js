var express = require('express');
var router = express.Router();

var products = require('../controllers/productController');
var productStat = require('../controllers/productStatController');
var families = require('../controllers/productFamilyController');
var categories = require('../controllers/productCategoryController');


/* # # # # # # # # # # # # #  PRODUCTS  # # # # # # # # # # # # # */
/*
* GET
* */

// GET /products
router.get('/', products.getAllProducts);

// GET /products/month/3
router.get('/month/:month', products.getProductsOfMonth);

// GET /products/id/asdfj23k2of9f32
// GET /products/id/asdfj23k2of9f32?p=3
router.get('/id/:productId', products.show);

// GET /products/fresh
router.get('/fresh', products.getFreshProducts);

// GET /products/search?str=jona
router.get('/search/:str', products.searchProductNames);

/*
* POST
* */

// POST /products
router.post('/', products.post);

// PUT /products/id/af243ec243c2c23423  --> body: Datenobjekt
router.put('/id/:productId', products.put);

// DELETE /products/id/asdf22asf2far32
router.delete('/id/:productId', products.delete);





/* # # # # # # # # # # # # #  PRODUCT-STAT  # # # # # # # # # # # # # */
/*
 * GET
 * */
// GET /products/stat
router.get('/stat', productStat.getAllProductStat);

// GET /products/stat/23kjsdi24oijdw
router.get('/stat/:productId', productStat.getProductStat);

// GET /products/stat
router.get('/ranking', productStat.getProductRanking);



/* # # # # # # # # # # # # #  PRODUCT FAMILIES  # # # # # # # # # # # # # */
/*
* GET
* */

// GET /products/families
router.get('/families', families.getAllFamilies);

// GET /products/family/ade2k34k2a3gr2
router.get('/family/:familyId', families.show);

/*
* POST
* */

// POST /products/family
router.post('/family', families.post);

// PUT /products/family/3sdf2323f24f2f
router.put('/family/:familyId', families.put);

// DELETE /products/family/132423f24f24f
router.delete('/family/:familyId', families.delete);






/* # # # # # # # # # # # # #  PRODUCT CATEGORIES  # # # # # # # # # # # # # */
/*
 * GET
 * */

// GET /products/categories
router.get('/categories', categories.getAllCategories);

// GET /products/category/ade2k34k2a3gr2
router.get('/category/:categoryId', categories.show);

/*
 * POST
 * */

// POST /products/category
router.post('/category', categories.post);

// PUT /products/category/3sdf2323f24f2f
router.put('/category/:categoryId', categories.put);

// DELETE /products/category/132423f24f24f
router.delete('/category/:categoryId', categories.delete);



module.exports = router;
