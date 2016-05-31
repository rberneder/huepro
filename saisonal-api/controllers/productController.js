require('../models/product');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('underscore');
var Product = mongoose.model('Product');
var productStat = require('./productStatController');
var imageGenerator = require('../util/imageGenerator');

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


exports.getFreshProducts = function (req, res) {
    var limit = 10;     // To return a maximum of 10 products
    var test = productStat.getAllProductStats()
        .then(function (prodStats) {
            if (!prodStats) return res.jsonp('[]');

            var actMonth = new Date().getMonth();

            Product.find()
                .where('harvestStartMonth', actMonth)
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
        if (err) {
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
    Product.find({'harvestStartMonth': req.params.month})
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

    if (img) {
        try {
            fs.rename(path.join(__dirname, "/../../saisonal-manager/temp/", img), path.join(__dirname, '/../', img));
            imageGenerator.createThumb(path.join(__dirname, '/../', img));
        } catch(e) {
            console.log(e);
        }
    }

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
            product.remove(function(err) {
                productStat.deleteProductStat(product);
                res.jsonp(product);
            });
        }
    });
};

