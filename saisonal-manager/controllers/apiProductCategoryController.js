/*
* DEPENDENCIES
* */
var request = require('request');
var apiUrl = require('./config').apiUrl;



// GET /api/products/categories  ->  List of all categories.
exports.getCategories = function(req, res) {
    request.get(apiUrl + '/products/categories', function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};


// POST /api/products/category  ->  Adds the category and returns the created API-entry.
exports.addCategory = function(req, res) {
    request.post({url: apiUrl + '/products/category', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(JSON.parse("[]"));
        } else {
            res.send(JSON.parse(body));
        }
    });
}