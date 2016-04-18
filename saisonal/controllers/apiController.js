/*
* DEPENDENCIES
* */
var request = require('request');
var apiPortNr = 25070;


/**
 * GET /api/products
 * List of all products.
 */
exports.getProducts = function(req, res) {
    request.get('http://127.0.0.1:' + apiPortNr + '/products', function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};


/**
 * GET /api/products/month/:month
 * List of all products in passed month.
 */
exports.getProductsOfMonth = function(req, res) {
    request.get('http://127.0.0.1:25090' + apiPortNr + '/products/month/' + req.params.month, function(err, request, body) {
        // TODO error handling
        res.send(JSON.parse(body));
    });
};


/**
 * GET /api/products/id/:id
 * Returns product matching passed id.
 */
exports.getProduct = function(req, res) {
    request.get('http://127.0.0.1:' + apiPortNr + '/products/id/' + req.params.id, function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};