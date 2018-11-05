var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var passport = require('passport')
var sequelize = require('sequelize')
var bodyParser = require('body-parser');
var models = require('./models')
var app = express();

//app.get
var indexRouter = require('./routes/index');
var headerRouter = require('./routes/header');
var aboutRouter = require('./routes/about');
var practiceRouter = require('./routes/practice');
var mypageRouter = require('./routes/mypage');
var loginRouter = require('./routes/login');
var enrollRouter = require('./routes/enroll');
var commuityRouter = require('./routes/commuity')
var commuityIdRouter = require('./routes/commuity_id')
var logoutRouter = require('./routes/logout');
var writeRouter = require('./routes/write');
var facebookRouter = require('./routes/facebook');
var facebookCallbackRouter = require('./routes/facebook_callback');
var facebookSuccessRouter = require('./routes/login_success')
//app.post
var loginReceiveRouter = require('./routes/login_receive');
var writeReceiveRouter = require('./routes/write_receive');
var enrollReceiveRouter = require('./routes/enroll_receive');
//sequelize
models.sequelize.sync()
	.then(function() {
	console.log('✓ DB connection success.');
	  console.log('  Press CTRL-C to stop\n');
  })
  .catch(function(err) {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
	secret:'123123123',
	resave:false,
	saveUninitialize:true
}));
app.use(express.static(__dirname));
app.use(passport.initialize());
app.use(passport.session());

//get
app.use('/', indexRouter);
app.use('/header',headerRouter);
app.use('/about',aboutRouter);
app.use('/practice',practiceRouter);
app.use('/mypage',mypageRouter);
app.use('/enroll',enrollRouter);
app.use('/login',loginRouter);
app.use('/commuity',commuityRouter);
app.use('/commuity',commuityIdRouter);
app.use('/logout',logoutRouter);
app.use('/write',writeRouter);
app.use('/auth/facebook',facebookRouter);
app.use('/auth/facebook/callback',facebookCallbackRouter);
app.use('/login_success',facebookSuccessRouter);

//post
app.use('/login_receive',loginReceiveRouter);
app.use('/write_receive',writeReceiveRouter);
app.use('/enroll_receive',enrollReceiveRouter);
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
