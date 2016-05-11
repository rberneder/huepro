require('../models/productCategory');
var mongoose = require('mongoose');
var _ = require('underscore');
var Category = mongoose.model('ProductCategory');


// Lists all product families
exports.getAllCategories = function(req, res) {
    Category.find()
        .sort({'name': 'asc'})
        .exec(function(err, products) {
            res.jsonp(products);
    });
};


// 
exports.show = function(req, res) {
    Category.load(req.params.categoryId, function(err, category) {  // TODO Werte überprüfen
        res.jsonp(category);
    });
};


// Adds a new product category
exports.post = function(req, res) {
    var category = new Category(req.body);    // TODO Werte überprüfen
    category.save();
    res.jsonp(category);
};



// Updates a product category
exports.put = function(req, res) {
    Category.load(req.params.categoryId, function(err, category) {  // TODO Werte überprüfen
        category = _.extend(category, req.body);
        category.save(function(err) {
            res.jsonp(category);
        });
    });
};


// Deletes a product category
exports.delete = function(req, res) {
    Category.load(req.params.categoryId, function(err, category) {  // TODO Werte überprüfen, vorhandene Verknüfungen?
        Category.remove(function(err) {
            res.jsonp(category);
        });
    });
};

