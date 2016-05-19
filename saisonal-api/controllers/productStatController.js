require('../models/productStat');
var mongoose = require('mongoose');
var _ = require('underscore');
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

exports.getProductStat = function(req, res) {
    ProductStat.find({'product_id': req.params.productId})
        .exec(function(err, productStat) {
            res.jsonp(productStat);
        });
}

exports.createProductStat = function(product) {
    if (product._id == null || product._id.length < 1) return;
    var productStat = new ProductStat({product_id: product._id});
    productStat.save();
    return productStat;
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