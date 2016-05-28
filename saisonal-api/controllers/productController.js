require('../models/product');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('underscore');
var Product = mongoose.model('Product');
var ProductStat = require('./productStatController');

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


/** Returns the product corresponding the passed ID. */
exports.show = function(req, res) {
    var id = req.params.productId;
    var trackPoints = req.query.p || 0;
    Product.load(req.params.productId, function(err, product) {
        if (err) {
            // TODO log error
            res.jsonp('[]');
        } else {
            ProductStat.trackProductStatPoints(product, trackPoints);
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

    if (img) {
        try {
            fs.rename(__dirname + "/../../saisonal-manager/temp/" + img, __dirname + '/../' + img);
        } catch(e) {
            console.log(e);
        }
    }

    product.save();
    ProductStat.createProductStat(product);
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
                ProductStat.deleteProductStat(product);
                res.jsonp(product);
            });
        }
    });
};

