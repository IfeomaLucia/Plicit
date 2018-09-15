var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Mongoose = require('mongoose');
var app = express();

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type, Accept, Authorization");


if(req.method === 'OPTIONS'){
  res.header('Access-Control-Allow-Methods', 'PUT,DELETE,PATCH,POST,GET');
  return res.status(200).json({});;
}
next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Comment');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://lucia:Neilifeoma1@ds255332.mlab.com:55332/lucia', { useNewUrlParser: true });
//Mongoose.connect('mongodb://localhost:27017/Plicit', { useNewUrlParser: true });

app.use('/', indexRouter);
app.use('/comments', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  const error = new Error('Not Found');
   error.status = 404;
   next(error);
})
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use((error, req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error:{
          message: error.message
      }
  })
});
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
