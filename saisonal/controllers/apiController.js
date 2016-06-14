/*
* DEPENDENCIES
* */
var request = require('request');
var apiUrl = 'http://127.0.0.1:25070';
var trackPoint = {
    simple: 1,
    search: 3
}


/*
* ///////// PRODUCTS /////////
* */
//GET /api/products        --> List of all products.
exports.getProducts = function(req, res) {
    request.get(apiUrl + '/products', function(err, request, body) {
        if (err) return res.send('[]');
        res.send(JSON.parse(body));
    });
};


//GET /api/products/month/:month       --> List of all products in passed month.
exports.getProductsOfMonth = function(req, res) {
    request.get(apiUrl + '/products/month/' + req.params.month, function(err, request, body) {
        if (err) return res.send('[]');
        res.send(JSON.parse(body));
    });
};


//GET /api/products/fresh      --> List of x fresh products.
exports.getFreshProducts = function(req, res) {
    request.get(apiUrl + '/products/fresh', function(err, request, body) {
        if (err) return res.send('[]');
        res.send(JSON.parse(body));
    });
};


//GET /api/products/id/:id     --> Returns product matching passed id and tracking simple display points
exports.getProduct = function(req, res) {
    request.get(apiUrl + '/products/id/' + req.params.id + '?p=' + trackPoint.simple, function(err, request, body) {
        if (err) return res.send('[]');
        res.send(JSON.parse(body));
    });
};


//GET /api/products/id/search/:id      --> Returns product matching passed id and tracking search tracking points
exports.getProductAfterSearch = function(req, res) {
    request.get(apiUrl + '/products/id/' + req.params.id + '?p=' + trackPoint.search, function(err, request, body) {
        if (err) return res.send('[]');
        res.send(JSON.parse(body));
    });
};


//GET /api/products/search?str=test     -> Returns products that contain passed string in array.
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
 * ///////// RECIPES /////////
 * */
//GET /api/recipes        --> List of all recipes.
exports.getRecipes = function(req, res) {
    request.get(apiUrl + '/recipes', function(err, request, body) {
        if (err) return res.send('[]');
        res.send(JSON.parse(body));
    });
};