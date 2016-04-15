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
app.set('port', 25080);
//app.set('view engine', 'jade');
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname), { maxAge: 31557600000 }));


/*
* ROUTES
* */
app.get('/', homeController.index);


/*
* ERROR HANDLER
* */
app.use(errorHandler());


/*
* START SERVER
* */
app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
