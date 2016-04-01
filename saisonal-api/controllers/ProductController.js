require('../models/product');
var mongoose = require('mongoose');
var _ = require('underscore');
var Product = mongoose.model('Product');

exports.post = function(req, res) {
    var product = new Product(req.body);    // TODO Werte überprüfen
    product.save();
    res.jsonp(product);
};

exports.get = function(req, res) {
    Product.find().exec(function(err, products) {
        res.jsonp(products);
    });
};

exports.show = function(req, res) {
    Product.load(req.params.productId, function(err, product) {  // TODO Werte überprüfen
        res.jsonp(product);
    });
};

exports.put = function(req, res) {
    Product.load(req.params.productId, function(err, product) {  // TODO Werte überprüfen

        product = _.extend(product, req.body);

        product.save(function(err) {
            res.jsonp(product);
        });
    });
};

exports.delete = function(req, res) {
    Product.load(req.params.productId, function(err, product) {  // TODO Werte überprüfen
        product.remove(function(err) {
            res.jsonp(product);
        });
    });
};

