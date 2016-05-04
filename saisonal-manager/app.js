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


/*
 * CONTROLLERS
 * */
var homeController = require('./controllers/homeController');
var apiController = require('./controllers/apiController');


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
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public'), { maxAge: 31557600000 }));


/*
 * ROUTES
 * */
app.get('/', homeController.index);
app.get('/api/products', apiController.getProducts);
app.get('/api/products/categories', apiController.getCategories);
app.get('/api/products/families', apiController.getFamilies);
app.get('/api/products/id/:id', apiController.getProduct);
app.get('/api/products/search/:str', apiController.searchProducts);
app.get('/api/products/month/:month', apiController.getProductsOfMonth);
app.post('/api/products', apiController.addProduct);
app.post('/api/products/category', apiController.addCategory);
app.post('/api/products/family', apiController.addFamily);
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
