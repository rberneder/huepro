require('../models/product');
require('../models/productFamily');
require('../models/productCategory');
var mongoose = require('mongoose');
var _ = require('underscore');
var Product = mongoose.model('Product');
var Family = mongoose.model('ProductFamily');
var Category = mongoose.model('ProductCategory');

/** Lists all products. */
exports.getAllProducts = function(req, res) {
    Category.find().exec(function(err, categories) {
        Family.find().exec(function(err, families) {
            Product.find()
                .sort({'name': 'asc'})
                .exec(function(err, products) {
                    var result = [];

                    for (var product of products) {
                        var family;
                        var category;
                        var addProduct = JSON.parse(JSON.stringify(product));

                        for (var fam of families) {
                            if (fam._id == product.productFamily_id) {
                                family = fam;
                                break;
                            }
                        }

                        for (var cat of categories) {
                            if (cat._id == family.productCategory_id) {
                                category = cat;
                                break;
                            }
                        }

                        addProduct.family = family;
                        addProduct.category = category;
                        
                        result.push(addProduct);
                    }

                    res.jsonp(result);
                });
        });
    });
};


/** Returns the product corresponding the passed ID. */
exports.show = function(req, res) {
    Product.load(req.params.productId, function(err, product) {  // TODO Werte überprüfen
        res.jsonp(product);
    });
};


/** Lists all products of month. */
exports.getProductsOfMonth = function(req, res) {
    Product.find({'harvestStart.month': req.params.month})
        .sort({'name': 'asc'})
        .exec(function(err, products) {
            res.jsonp(products);
    });
};


exports.searchProductNames = function (req, res) {
    var str = decodeURI(req.params.str);
    Product.find({'name': new RegExp('(' + str + ')', 'i')})
        .sort({'name': 'asc'})
        .exec(function(err, products) {
            res.jsonp(products)
        });
}


/** Adds a new product. */
exports.post = function(req, res) {
    var product = new Product(req.body);    // TODO Werte überprüfen
    product.save();
    res.jsonp(product);
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

