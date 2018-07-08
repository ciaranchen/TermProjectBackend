const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// use db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cardgo');
mongoose.set('debug', true);

mongoose.connection.on("error", console.log);
mongoose.connection.on("open", () => {
  console.log("database open");
});

// session
const session = require('express-session');
const FileStore = require('session-file-store')(session);

let identityKey = 'skey';

app.use(session({
  name: identityKey,
  secret: 'chyingp',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10 * 1000  // 有效期，单位是毫秒
  }
}));

// post args
// const bodyParser = require('body-parser');
// app.use(express.bodyParser());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const groupsRouter = require('./routes/groups');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/groups', groupsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: "err",
    msg: err.message
  })
});

module.exports = app;
