/*
* DEPENDENCIES
* */
var request = require('request');
var apiUrl = require('./config').apiUrl;
var util = require('./util');



// GET /api/products/families  ->  List of all families.
exports.getFamilies = function(req, res) {
    request.get(apiUrl + '/products/families', function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
};


// POST /api/products/family  ->  Adds the family and returns the created API-entry.
exports.addFamily = function(req, res) {
    request.post({url: apiUrl + '/products/family', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    });
}


// DELETE /api/products/family/a23df2f32fasc34  ->  Deletes the family with the corresponding ID
exports.deleteFamily = function(req, res) {
    request.delete(apiUrl + '/products/family/' + req.params.id, function(err, request, body) {
        if (err) {
            res.send(util.jsonParseErr(err));
        } else {
            res.send(util.jsonParse(body));
        }
    })
}