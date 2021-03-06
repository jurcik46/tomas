var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

const expressLayouts = require('express-ejs-layouts')
var app = express();

// view engine setup
// Set Templating Engine
app.use(expressLayouts)
// app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layout/full-witdh')

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true,
    maxAge: 60000
  }
}))
app.use(flash());
app.use('/', indexRouter);
app.use('/articles', articlesRouter);

app.use('/users', usersRouter);

// app.get('/login', (req, res) => {
//   res.render('login', { title: 'Login Page', layout: './layout/sidebar' })
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
