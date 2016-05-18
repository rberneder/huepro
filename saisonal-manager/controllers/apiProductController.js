/*
* DEPENDENCIES
* */
var request = require('request');
var apiUrl = require('./config').apiUrl;
var util = require('./util');

// GET /api/products  ->  List of all products.
exports.getProducts = function(req, res) {
    request.get(apiUrl + '/products', function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};


// GET /api/products/month/:month  ->  List of all products in passed month.
exports.getProductsOfMonth = function(req, res) {
    request.get(apiUrl + '/products/month/' + req.params.month, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};


// GET /api/products/id/:id  ->  Returns product matching passed id.
exports.getProduct = function(req, res) {
    request.get(apiUrl + '/products/id/' + req.params.id, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};

// DELETE /api/products/id/a23df2f32fasc34  ->  Deletes the product with the corresponding ID
exports.deleteProduct = function(req, res) {
    request.delete(apiUrl + '/products/id/' + req.params.id, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};


// GET /api/products/search?str=test  -> Returns products that contain passed string in array.
exports.searchProducts = function(req, res) {
    var str = req.params.str;

    if (str) {
        request.get(apiUrl + '/products/search/' + str, function(err, request, body) {
            if (err) {
                res.send(util.jsonParseErr(err));
            } else {
                res.send(util.jsonParse(body));
            }
        });
    }
};


// POST /api/products ->  Adds the product and returns the created API-entry.
exports.addProduct = function(req, res) {
    request.post({url: apiUrl + '/products', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};


// PUT /api/products/id/a23df2f32fasc34 ->  Updates the product and returns the created API-entry.
exports.updateProduct = function(req, res) {
    request.put({url: apiUrl + '/products/id/' + req.params.id, form: req.body}, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};