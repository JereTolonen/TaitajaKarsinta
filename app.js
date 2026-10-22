// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: Express-sovelluksen pohja, EJS-näkymämoottori ja virheenkäsittely
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler (fallback page)
var errorTexts = {
  400: 'The request could not be understood.',
  401: 'You need to log in to see this page.',
  403: 'You do not have permission to see this page.',
  404: 'The page you are looking for does not exist.',
  500: 'Something went wrong on our side. Please try again later.'
};

app.use(function(err, req, res, next) {
  var status = err.status || 500;

  res.status(status);
  res.render('error', {
    title: status + ' - ' + (err.message || 'Error'),
    status: status,
    heading: err.message || 'Error',
    text: errorTexts[status] || 'An unexpected error occurred.',
    stack: req.app.get('env') === 'development' ? err.stack : null
  });
});

module.exports = app;
// AI-KÄYTTÖ PÄÄTTYY
