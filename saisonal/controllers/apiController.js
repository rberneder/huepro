/*
* DEPENDENCIES
* */
var request = require('request');


/**
 * GET /api/products
 * List of all products.
 */
exports.getProducts = function(req, res) {
    request.get('http://127.0.0.1:25090/products', function(err, request, body) {
        // TODO error handling
        res.send(JSON.parse(body));
    });
};


/**
 * GET /api/products/month/:month
 * List of all products in passed month.
 */
exports.getProductsOfMonth = function(req, res) {
    request.get('http://127.0.0.1:25090/products/month/' + req.params.month, function(err, request, body) {
        // TODO error handling
        res.send(JSON.parse(body));
    });
};