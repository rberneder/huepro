var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crontab = require('node-crontab');

var productStat = require('./controllers/productStatController');
var updateStatJob = crontab.scheduleJob("*/5 * * * *", productStat.updateStats);


var products = require('./routes/products');

var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/saisonal-api');
var db = mongoose.connection;

db.on('error', function callback() {
  console.log("Verbindung zur MongoDB fehlgeschlagen.");
});

db.once('open', function callback() {
  console.log("Verbindung zur MongoDB hergestellt.");
});


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/products', products);
app.use('*', function(req, res) { res.jsonp('[]')});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
