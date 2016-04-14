var express = require('express');
var router = express.Router();

var products = require('../controller/productController');

/* POST products */
router.post('/', products.post);

module.exports = router;
