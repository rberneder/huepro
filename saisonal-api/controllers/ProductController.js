require('../models/product');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

exports.post = function(req, res) {
    var product = new Product(req.body);    // TODO Werte überprüfen
    product.save();
    res.jsonp(product);
}