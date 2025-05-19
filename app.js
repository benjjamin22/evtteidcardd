var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs= require ( 'fs') ;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var cors = require('cors');

// Use CORS middleware
//app.use(cors());
//var session = require('express-session');
//var { v4 : uuidv4 } = require('uuid');

//const corsOptions = {
  //origin: 'https://www.isemb.mydatabase.com.ng/',//(https://your-client-app.com)
  //optionsSuccessStatus: 200,
//};

//app.use(cors(corsOptions));

var route = require('./routes/router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next)=>{
  if(req.body && typeof req.body === 'object'){
      for(const key in req.body){
          if(typeof req.body[key] ==='string'){
              req.body[key] = req.body[key].toUpperCase();
          }
      }
  }
  next()
})

app.use('/', route);

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
  res.render('error');
});



module.exports = app;



