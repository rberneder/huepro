'use strict';

/*
 * ///////// HTTPS /////////
 * */
var LEX = require('letsencrypt-express');

var lex = LEX.create({
    configDir: '/etc/letsencrypt',
    privkeyPath: ':config/live/:hostname/privkey.pem',
    fullchainPath: ':config/live/:hostname/fullchain.pem',
    certPath: ':config/live/:hostname/cert.pem',
    chainPath: ':config/live/:hostname/chain.pem',
    approveRegistration: null
});



/*
 * ///////// MODULE DEPENDENCIES /////////
 * */
var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('spdy');
var session = require('express-session');
var errorHandler = require('errorhandler');
var compress = require('compression');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



/*
 * ///////// REDIRECT FROM HTTP TO HTTPS /////////
 * */
function redirectHttp() {
    var httpServer = express();
    httpServer.get('*',function(req,res){
        res.redirect('https://www.saisonal.at' + req.url)
    });
    httpServer.listen(80);
}


/*
 * ///////// CONTROLLERS /////////
 * */
var homeController = require('./controllers/homeController');
var apiController = require('./controllers/apiController');


/*
 * ///////// EXPRESS SERVER /////////
 * */
var app = express();

/*
 * EXPRESS CONFIGURATION
 * */
// app.set('port', 25080);
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
 * ///////// ROUTES /////////
 * */
app.get('*', homeController.siteUnderConstruction);
app.post('*', homeController.siteUnderConstructionPost);

app.get('/', homeController.index);
app.get('/uploads/:element/:folder/:file', homeController.getFile);
app.get('/api/products', apiController.getProducts);
app.get('/api/products/fresh', apiController.getFreshProducts);
app.get('/api/products/id/:id', apiController.getProduct);
app.get('/api/products/id/search/:id', apiController.getProductAfterSearch);
app.get('/api/products/search/:str', apiController.searchProducts);
app.get('/api/products/month/:month', apiController.getProductsOfMonth);
app.get('/node_modules/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, req.url));
});

app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});


/*
 * ///////// ERROR HANDLER /////////
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
 * ///////// START SERVER /////////
 * */
redirectHttp();
https.createServer(lex.httpsOptions, LEX.createAcmeResponder(lex, app)).listen(443);

module.exports = app;
