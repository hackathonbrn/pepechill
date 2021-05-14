const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const authCheck = require('./src/middlewares/authCheck');

const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login');
const registerRouter = require('./src/routes/register');
const test = require('./src/routes/test');

const app = express();

const auth = async function (req, res, next) {
  await authCheck(req, res, next);
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/test', auth, test);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3022);
