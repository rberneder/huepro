/*
* DEPENDENCIES
* */
var request = require('request');
var apiUrl = 'http://127.0.0.1:25070';


/**
 * GET /api/products
 * List of all products.
 */
exports.getProducts = function(req, res) {
    request.get(apiUrl + '/products', function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};


/**
 * GET /api/products/month/:month
 * List of all products in passed month.
 */
exports.getProductsOfMonth = function(req, res) {
    request.get(apiUrl + '/products/month/' + req.params.month, function(err, request, body) {
        // TODO error handling
        res.send(JSON.parse(body));
    });
};


/**
 * GET /api/products/id/:id
 * Returns product matching passed id.
 */
exports.getProduct = function(req, res) {
    request.get(apiUrl + '/products/id/' + req.params.id, function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};


/*
* GET /api/products/search?str=test
* Returns products that contain passed string in array.
* */
exports.searchProducts = function(req, res) {
    var str = req.params.str;

    if (str) {
        request.get(apiUrl + '/products/search/' + str, function(err, request, body) {
            if (err) {
                res.send(JSON.parse("[]"));
            } else {
                res.send(JSON.parse(body));
            }
        });
    }
}


/*
 * POST /api/products
 * Adds the product and returns the created API-entry.
 * */
exports.addProduct = function(req, res) {
    request.post({url: apiUrl + '/products', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(JSON.parse("[]"));
        } else {
            res.send(JSON.parse(body));
        }
    });
}


/**
 * GET /api/products/categories
 * List of all categories.
 */
exports.getCategories = function(req, res) {
    request.get(apiUrl + '/products/categories', function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};


/*
 * POST /api/products/category
 * Adds the category and returns the created API-entry.
 * */
exports.addCategory = function(req, res) {
    request.post({url: apiUrl + '/products/category', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(JSON.parse("[]"));
        } else {
            res.send(JSON.parse(body));
        }
    });
}


/**
 * GET /api/products/families
 * List of all families.
 */
exports.getFamilies = function(req, res) {
    request.get(apiUrl + '/products/families', function(err, request, body) {
        if  (err) {
            res.send('"Error": "Something went wrong!"');
        } else {
            res.send(JSON.parse(body));
        }
    });
};


/*
 * POST /api/products/family
 * Adds the family and returns the created API-entry.
 * */
exports.addFamily = function(req, res) {
    request.post({url: apiUrl + '/products/family', form: req.body}, function(err, request, body) {
        if (err) {
            res.send(JSON.parse("[]"));
        } else {
            res.send(JSON.parse(body));
        }
    });
}