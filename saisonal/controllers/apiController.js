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
// GET /api/products        --> List of all products.
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

//GET /api/recipes/id/:id     --> Returns recipe matching passed id
exports.getRecipe = function(req, res) {
    request.get(apiUrl + '/recipes/id/' + req.params.id, function(err, request, body) {
        if (err) return res.send('[]');
        res.send(JSON.parse(body));
    });
};


exports.processSpeechCommand = function(command, res) {
    var payload;

    if (command.result.action == 'products.show') {
        request.get(apiUrl + '/products', function(err, request, body) {
            if (err) return res.send('[]');

            var products = JSON.parse(body),
                productsHTML = new Array();


            for (var i = 0; i < products.length; i++) {
                var productHTML = '<article class="col-xs-4">';
                productHTML += '<img class="img-responsive" src="' + products[i].image + '"/>';
                productHTML += '<h2>' + products[i].name + '</h2>';
                productHTML += '</article>';

                productsHTML.push(productHTML);
            }

            sendResponse(err, request, productsHTML);
        });
    }

    if (command.result.action == 'products.showByName') {
        try {
            var name = command.result.parameters.productName;

            if (name) {
                request.get(apiUrl + '/products/search/' + name, function(err, request, body) {
                    if (err) return sendResponse(err, request, '');

                    var product = JSON.parse(body);
                    var htmlStr = '<article class="col-xs-6 col-xs-offset-3">';
                    htmlStr += '<img class="img-responsive" src="' + product[0].image + '"/>';
                    htmlStr += '<h2>' + product[0].name + '</h2>'
                    htmlStr += '</article>';

                    sendResponse(err, request, htmlStr);

                });
            } else {
                sendResponse(null, request, '');
            }
        } catch (e) {
            console.log(e);
            sendResponse(null, request, '');
        }
    }

    if (command.result.action == 'products.showRipe') {
        request.get(apiUrl + '/products/fresh', function(err, request, body) {
            if (err) return res.send('[]');

            var products = JSON.parse(body),
                productsHTML = new Array();


            for (var i = 0; i < products.length; i++) {
                var productHTML = '<article class="col-xs-4">';
                productHTML += '<img class="img-responsive" src="' + products[i].image + '"/>'
                productHTML += '<h2>' + products[i].name + '</h2>';
                productHTML += '</article>';

                productsHTML.push(productHTML);
            }

            sendResponse(err, request, productsHTML);
        });
    }


    function sendResponse(err, request, body) {
        if (err) return res.send('[]');

        payload = body;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            response: command,
            data: payload
        }));
    }
}