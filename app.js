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
  next(createError(404, 'Sivua ei löytynyt'));
});

// error handler (fallback page)
var errorTexts = {
  400: 'Pyyntöä ei voitu käsitellä.',
  401: 'Sivun näkeminen vaatii kirjautumisen.',
  403: 'Sinulla ei ole oikeutta nähdä tätä sivua.',
  404: 'Etsimääsi sivua ei löytynyt.',
  500: 'Palvelussa tapahtui virhe. Yritä myöhemmin uudelleen.'
};

app.use(function(err, req, res, next) {
  var status = err.status || 500;

  res.status(status);
  res.render('error', {
    title: status + ' – Tapahtumakalenteri',
    status: status,
    heading: err.message || 'Error',
    text: errorTexts[status] || 'Tapahtui odottamaton virhe.',
    stack: req.app.get('env') === 'development' ? err.stack : null
  });
});

module.exports = app;
// AI-KÄYTTÖ PÄÄTTYY
