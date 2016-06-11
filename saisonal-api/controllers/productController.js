require('../models/product');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('underscore');
var Product = mongoose.model('Product');
var productStat = require('./productStatController');
var imageManager = require('../util/imageManager');


/** Lists all products. */
exports.getAllProducts = function(req, res) {
    Product.find()
        .sort({'name': 'asc'})
        .exec(function(err, products) {
            if (err) {
                // TODO log error
                res.jsonp('[]');
            } else {
                res.jsonp(products);
            }
        });
};


/** Lists all fresh products (ordered by trend). */
exports.getFreshProducts = function (req, res) {
    var limit = 10;     // To return a maximum of 10 products
    productStat.getAllProductStats()
        .then(function (prodStats) {
            if (!prodStats) return res.jsonp('[]');

            var actMonth = new Date().getMonth();

            Product.find()
                .lte('harvestStartMonth', actMonth)
                .gte('harvestEndMonth', actMonth)
                .exec(function (err, products) {
                    if (err) {
                        console.log('Error: getFreshProducts. ', err);
                        return res.jsonp('[]');
                    } else {
                        var freshProducts = [];
                        for (var i = 0; i < prodStats.length && freshProducts.length < limit; i++) {
                            for (var j = 0; j < products.length; j++) {
                                if (products[j]._id == prodStats[i].product_id) {
                                    freshProducts.push(products[j]);
                                    break;
                                }
                            }
                        }
                        return res.jsonp(freshProducts);
                    }
                });
        });
}


/** Returns the product corresponding the passed ID. */
exports.show = function(req, res) {
    var id = req.params.productId;
    var trackPoints = req.query.p || 0;
    Product.load(req.params.productId, function(err, product) {
        if (err || !product) {
            // TODO log error
            res.jsonp('[]');
        } else {
            productStat.trackProductStatPoints(product, trackPoints);
            res.jsonp(product);
        }
    });
};


/** Lists all products of month. */
exports.getProductsOfMonth = function(req, res) {
    Product
        .find()
        .lte('harvestStartMonth', req.params.month)
        .gte('harvestEndMonth', req.params.month)
        .sort({'name': 'asc'})
        .exec(function(err, products) {
            if (err) {
                // TODO log error
                res.jsonp('[]');
            } else {
                res.jsonp(products);
            }
    });
};


exports.searchProductNames = function (req, res) {
    var str = decodeURI(req.params.str);
    Product.find({'name': new RegExp('(' + str + ')', 'i')})
        .sort({'name': 'asc'})
        .exec(function(err, products) {
            if (err) {
                // TODO log error
                res.jsonp('[]');
            } else {
                res.jsonp(products);
            }
        });
}


/** Adds a new product. */
exports.post = function(req, res) {
    var product = new Product(req.body);    // TODO Werte überprüfen
    var img = product.image;
    if (img.substr(-5) === '.jpeg') img = (img.substr(0, (img.length - 5)) + '.jpg');   // Change .jpeg to .jpg

    if (img) imageManager.processUploadedImage(img);

    product.save();
    productStat.createProductStat(product);
    res.jsonp(product);
};


/** Updates product. */
exports.put = function(req, res) {
    Product.load(req.params.productId, function(err, product) {
        if (err) {
            // TODO log error
            res.jsonp('[]');
        } else {
            product = _.extend(product, req.body);
            product.save(function(err) {
                res.jsonp(product);
            });
        }
    });
};


/** Deletes the product corresponding the passed ID. */
exports.delete = function(req, res) {
    Product.load(req.params.productId, function(err, product) {
        if (err) {
            // TODO log error
            res.jsonp('[]');
        } else {
            if (!product) return res.jsonp('[]');

            var img = product.image;
            if (img) imageManager.deleteImage(img);

            product.remove(function(err) {
                productStat.deleteProductStat(product);
                res.jsonp(product);
            });
        }
    });
};

