require('../models/productStat');
require('../models/product');
var mongoose = require('mongoose');
var _ = require('underscore');
var Product = mongoose.model('Product');
var ProductStat = mongoose.model('ProductStat');


exports.trackProductStatPoints = function(product, points) {
    ProductStat
        .where({product_id: product._id})
        .findOne(function(err, productStat) {
            if (productStat == null) {
                console.log('Error: productStatController/12');

            } else {
                productStat.views++;
                productStat.overallPoints += 1. * points;
                productStat.save(function(err) {
                    return productStat;
                });
            }
        });
}

exports.getAllProductStat = function(req, res) {
    ProductStat.find()
        .exec(function(err, productStat) {
            res.jsonp(productStat);
        });
}

exports.getProductStat = function(req, res) {
    ProductStat.find({product_id: req.params.productId})
        .exec(function(err, productStat) {
            res.jsonp(productStat);
        });
}

exports.getAllProductStats = function() {
    return ProductStat.find().sort({trend: 'desc'}).select('product_id').exec();
}

exports.getProductRanking = function(req, res) {
    ProductStat.find().sort({trend: 'desc'}).select('product_id trend overallPoints').exec(function(err, stats) {
        if (err) {
            console.log('ERROR: Cannot get product-statistics from database.', err);

        } else {
            Product.find().exec(function(err, products) {
                if (err) {
                    console.log('ERROR: Cannot get products from database.', err);

                } else {
                    var result = new Array();

                    for (var i = 0; i < stats.length; i++) {
                        var searchId = stats[i].product_id;

                        for (var j = 0; j < products.length; j++) {
                            if (products[j]._id == searchId) {
                                result.push({
                                    product: products[j],
                                    trend: stats[i].trend,
                                    overallPoints: stats[i].overallPoints
                                });
                                break;
                            }
                        }
                    }
                    res.jsonp(result);
                }
            });
        }
    });
}

exports.createProductStat = function(product) {
    if (product._id == null || product._id.length < 1) return;
    var productStat = new ProductStat({product_id: product._id});
    productStat.save();
    return productStat;
}


exports.deleteProductStat = function(product) {
    ProductStat.findOne({product_id: product._id})
        .exec(function(err, productStat) {
            if (err || !productStat) {
                console.log('Error: Product not found.', product);
            } else {
                productStat.remove(function(err) {
                    // Removed
                });
            }
        });
}



/*
 * STATISTICS CALCULATIONS
 */
exports.updateStats = function() {
    ProductStat.find().exec(function(err, stats) {
        _.each(stats, function(productStat) {
            try {
                productStat.trend = productStat.overallPoints / productStat.views;
                productStat.save();
            } catch (e) {}
        })
    });
}