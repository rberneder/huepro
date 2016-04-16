require('../models/product');
var mongoose = require('mongoose');
var _ = require('underscore');
var Product = mongoose.model('Product');


/** Lists all products. */
exports.getAllProducts = function(req, res) {
    Product.find().exec(function(err, products) {
        res.jsonp(products);
    });
};


/** Lists all products of month. */
exports.getProductsOfMonth = function(req, res) {
    Product.find({'harvestStart.month': req.params.month}).exec(function(err, products) {
        res.jsonp(products);
    });
};


/** Adds a new product. */
exports.post = function(req, res) {
    var product = new Product(req.body);    // TODO Werte überprüfen
    product.save();
    res.jsonp(product);
};


/** Returns the product corresponding the passed ID. */
exports.show = function(req, res) {
    Product.load(req.params.productId, function(err, product) {  // TODO Werte überprüfen
        res.jsonp(product);
    });
};


/** Updates product. */
exports.put = function(req, res) {
    Product.load(req.params.productId, function(err, product) {  // TODO Werte überprüfen

        product = _.extend(product, req.body);

        product.save(function(err) {
            res.jsonp(product);
        });
    });
};


/** Deletes the product corresponding the passed ID. */
exports.delete = function(req, res) {
    Product.load(req.params.productId, function(err, product) {  // TODO Werte überprüfen
        product.remove(function(err) {
            res.jsonp(product);
        });
    });
};

