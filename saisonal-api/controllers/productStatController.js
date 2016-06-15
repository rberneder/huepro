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
                productStat.pointsTotal += 1. * points;
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
    ProductStat.find().sort({trendSnapshot: 'desc'}).exec(function(err, stats) {
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
                                    points: stats[i].points,
                                    pointsTime: stats[i].pointsTime,
                                    pointsTotal: stats[i].pointsTotal,
                                    views: stats[i].views,
                                    trendSnapshot: stats[i].trendSnapshot,
                                    pointSnapshots: stats[i].pointSnapshots,
                                    pointSnapshotsTime: stats[i].pointSnapshotsTime,
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
 * ///////// STATISTICS CALCULATIONS /////////
 */
function updateTrend() {
    ProductStat.find().exec(function(err, stats) {
        _.each(stats, function(productStat) {
            try {
                productStat.trend = productStat.pointsTotal / productStat.views;
                productStat.points.push(
                    (productStat.points.length < 1) ?
                    productStat.pointsTotal :
                    productStat.pointsTotal - productStat.points[productStat.points.length - 1]
                );
                productStat.pointsTime.push(new Date());
                productStat.save();
            } catch (e) {}
        })
    });
}

function updateTrendSnapshot() {
    var maxSize = 8 * 7;   // every 3h for 7 days
    var now = new Date();

    ProductStat.find().exec(function(err, stats) {
        if (err) {
            console.error('ERROR: Scheduled updateTrendSnapshot cannot be performed.', err);

        } else {
            _.each(stats, function(stat) {
                var pointsLength = stat.pointSnapshots.length;
                var pointSnapshot = stat.pointsTotal - ((pointsLength > 1) ? stat.pointSnapshots[pointsLength - 2] : 0);
                
                if (pointsLength >= maxSize) {
                    stat.pointSnapshots.splice(0, 1);
                    stat.pointSnapshotsTime.splice(0, 1);
                }
                
                stat.pointSnapshots.push(pointSnapshot);
                stat.pointSnapshotsTime.push(now);

                stat.trendSnapshot = 0;
                for (var i = 0; i < stat.pointSnapshots.length; i++) {
                    var factor = 1 + (1 / (i + 1));
                    stat.trendSnapshot += factor * stat.pointSnapshots[i];
                }

                stat.save();
            });}
    });
}

function getMinutes(date) {
    return (date.getTime() / 1000 / 60);
}

var updateSchedule = [
    {
        cb: updateTrendSnapshot,
        rate: 3 * 60,       // 3h
        lastUpdate: null
    },
    {
        cb: updateTrend,
        rate: 24 * 60,      // 24h
        lastUpdate: null
    }
];

exports.updateStats = function() {
    for (var i = 0; i < updateSchedule.length; i++) {
        var now = new Date();
        var lastUpdate = updateSchedule[i].lastUpdate;
        var rate = updateSchedule[i].rate;

        if (lastUpdate === null || (Math.floor(getMinutes(now) / rate) - Math.floor(getMinutes(lastUpdate) / rate)) != 0) {
            updateSchedule[i].cb();
            updateSchedule[i].lastUpdate = now;
        }
    }
}