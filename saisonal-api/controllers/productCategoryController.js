require('../models/productCategory');
var mongoose = require('mongoose');
var _ = require('underscore');
var Category = mongoose.model('ProductCategory');


// Lists all product families
exports.getAllCategories = function(req, res) {
    Category.find()
        .sort({'name': 'asc'})
        .exec(function(err, categories) {
            if (err) {
                // TODO log error
                res.jsonp('[]');
            } else {
                res.jsonp(categories);
            }
    });
};


// 
exports.show = function(req, res) {
    Category.load(req.params.categoryId, function(err, category) {
        if (err) {
            // TODO log error
            res.jsonp('[]');
        } else {
            res.jsonp(category);
        }
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
    Category.load(req.params.categoryId, function(err, category) {
        category = _.extend(category, req.body);
        if (!category) {
            console.log('Error: Category cannot be loaded.');
        } else {
            category.save(function(err) {
                if (err) {
                    // TODO log error
                    res.jsonp('[]');
                } else {
                    res.jsonp(category);
                }
            });
        }
    });
};


// Deletes a product category
exports.delete = function(req, res) {
    Category.load(req.params.categoryId, function(err, category) {
        category.remove(function(err) {
            if (err) {
                // TODO log error
                res.jsonp('[]');
            } else {
                res.jsonp(category);
            }
        });
    });
};

