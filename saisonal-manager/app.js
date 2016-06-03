/*
 * MODULE DEPENDENCIES
 * */
var express = require('express');
var session = require('express-session');
var errorHandler = require('errorhandler');
var compress = require('compression');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var jwt = require('jwt-simple');
// https://www.sitepoint.com/using-json-web-tokens-node-js/

/*
* MIDDLEWARE
* */
// var jwtauth = require('./lib/jwtauth.js');

/*
* MODEL
* */
// var UserMode= require('./models/user');

/*
* DATABASE
* */

/**
 * RESTRICT ACCESS

var requireAuth = function(req, res, next) {
	if (!req.user) {
		res.end('Not authorized', 401)
	}	else {
		next()
	}
}*/

/*
 * CONTROLLERS
 * */
var homeController = require('./controllers/homeController');
var uploadController = require('./controllers/uploadController');
var apiProductController = require('./controllers/apiProductController');
var apiProductCategoryController = require('./controllers/apiProductCategoryController');
var apiProductFamilyController = require('./controllers/apiProductFamilyController');

/*
 * EXPRESS SERVER
 * */
var app = express();


/*
 * EXPRESS CONFIGURATION
 * */
app.set('port', 25090);
// app.set('views', path.join(__dirname, '/public'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
//app.set('jwtTokenSecret', 'saugeheimerstring'); //OUR_SECRET_STRING
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public'), { maxAge: 31557600000 }));

/*
 * ROUTES
 * */

// app.all('/*', [express.bodyParser(), jwtauth, requireAuth]);

app.get('/', homeController.index);
app.post('/upload/product-image', uploadController.uploadProductImage);
app.get('/uploads/:element/:folder/:file', homeController.getFile);


app.get('/api/products', apiProductController.getProducts);
app.get('/api/products/id/:id', apiProductController.getProduct);
app.get('/api/products/search/:str', apiProductController.searchProducts);
app.get('/api/products/month/:month', apiProductController.getProductsOfMonth);
app.post('/api/products', apiProductController.addProduct);
app.delete('/api/products/id/:id', apiProductController.deleteProduct);
app.put('/api/products/id/:id', apiProductController.updateProduct);


app.get('/api/products/categories', apiProductCategoryController.getCategories);
app.post('/api/products/category', apiProductCategoryController.addCategory);
app.delete('/api/products/category/:id', apiProductCategoryController.deleteCategory);
app.put('/api/products/category/:id', apiProductCategoryController.updateCategory);


app.get('/api/products/families', apiProductFamilyController.getFamilies);
app.post('/api/products/family', apiProductFamilyController.addFamily);
app.delete('/api/products/family/:id', apiProductFamilyController.deleteFamily);
app.put('/api/products/family/:id', apiProductFamilyController.updateFamily);

app.get('/node_modules/*', function(req, res, next) {
	res.sendFile(path.join(__dirname, req.url));
});

app.get('*', function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});


/*
 * ERROR HANDLER
 * */
if (app.get('env') === 'development') {
	//app.use(errorHandler());
}
app.use(function(err, req, res, next) {
	if (req.xhr) {
		res.status(404).send({ error: 'Something went wrong!' });
	} else {
		res.status(200);
		res.sendFile(path.join(__dirname, '/public/index.html'));
	}
});


/*
 * START SERVER
 * */
app.listen(app.get('port'), function() {
	console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
