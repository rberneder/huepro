require('../models/productFamily');
var mongoose = require('mongoose');
var _ = require('underscore');
var Family = mongoose.model('ProductFamily');


// Lists all product families
exports.getAllFamilies = function(req, res) {
    Family.find()
        .sort({'name': 'asc'})
        .exec(function(err, products) {
            res.jsonp(products);
    });
};


// 
exports.show = function(req, res) {
    Family.load(req.params.familyId, function(err, family) {  // TODO Werte überprüfen
        res.jsonp(family);
    });
};


// Adds a new product family
exports.post = function(req, res) {
    var family = new Family(req.body);    // TODO Werte überprüfen
    family.save();
    res.jsonp(family);
};



// Updates a product family
exports.put = function(req, res) {
    Family.load(req.params.familyId, function(err, family) {  // TODO Werte überprüfen
        family = _.extend(family, req.body);
        family.save(function(err) {
            res.jsonp(family);
        });
    });
};


// Deletes a product family
exports.delete = function(req, res) {
    Family.load(req.params.familyId, function(err, family) {  // TODO Werte überprüfen, vorhandene Verknüfungen?
        family.remove(function(err) {
            res.jsonp(family);
        });
    });
};

