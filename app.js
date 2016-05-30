var express = require('express');
var morganLogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./src/routes/index');

var app = express();
app.use(morganLogger('dev'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Allow CORS
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Load all routes
app.use('/hackauth', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development (and test/mock) error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'test') {
  app.use(function(err, req, res, next) {
    console.log('########## ERROR ##########', err);

    res.status(err.status || 500);
    res.json({
      errMessage: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('########## ERROR ##########', err);
  
  res.status(err.status || 500);
  res.json({
    errMessage: err.message,
    error: {}
  });
});


module.exports = app;