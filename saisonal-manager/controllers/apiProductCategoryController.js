/*
* DEPENDENCIES
* */
var request = require('request');
var apiUrl = require('./config').apiUrl;
var util = require('./util');



// GET /api/products/categories  ->  List of all categories.
exports.getCategories = function(req, res) {
    request.get(apiUrl + '/products/categories', function(err, request, body) {
        if  (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};


// POST /api/products/category  ->  Adds the category and returns the created API-entry.
exports.addCategory = function(req, res) {
    request.post({url: apiUrl + '/products/category', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
}


// DELETE /api/products/category/a23df2f32fasc34  ->  Deletes the category with the corresponding ID
exports.deleteCategory = function(req, res) {
    request.delete(apiUrl + '/products/category/' + req.params.id, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    })
}