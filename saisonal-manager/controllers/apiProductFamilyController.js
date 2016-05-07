/*
* DEPENDENCIES
* */
var request = require('request');
var apiUrl = require('./config').apiUrl;



// GET /api/products/families  ->  List of all families.
exports.getFamilies = function(req, res) {
    request.get(apiUrl + '/products/families', function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};


// POST /api/products/family  ->  Adds the family and returns the created API-entry.
exports.addFamily = function(req, res) {
    request.post({url: apiUrl + '/products/family', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(JSON.parse("[]"));
        } else {
            res.send(JSON.parse(body));
        }
    });
}