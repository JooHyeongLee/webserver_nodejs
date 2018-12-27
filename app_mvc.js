const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const sequelize = require('sequelize')
const models = require('./models')
const app = express();

//app.get
const indexRouter = require('./routes/index');
const headerRouter = require('./routes/header');
const aboutRouter = require('./routes/about');
const practiceRouter = require('./routes/practice');
const mypageRouter = require('./routes/mypage');
const loginRouter = require('./routes/login');
const enrollRouter = require('./routes/enroll');
const commuityRouter = require('./routes/commuity')
const commuityIdRouter = require('./routes/commuity_id')
const logoutRouter = require('./routes/logout');
const writeRouter = require('./routes/write');
const facebookRouter = require('./routes/facebook');
const facebookCallbackRouter = require('./routes/facebook_callback');
const facebookSuccessRouter = require('./routes/login_success');
const chattingRouter = require('./routes/chatting');

//app.post
const loginReceiveRouter = require('./routes/login_receive');
const writeReceiveRouter = require('./routes/write_receive');
const enrollReceiveRouter = require('./routes/enroll_receive');
const commuityReceiveRouter = require('./routes/commuity_search');
const practiceReceiveRouter = require('./routes/practice_receive');
const practiceChatRouter = require('./routes/practice_chat');
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
//CORS 설정
app.use(cors());
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
app.use('/chatting',chattingRouter);

//post
app.use('/login_receive',loginReceiveRouter);
app.use('/write_receive',writeReceiveRouter);
app.use('/enroll_receive',enrollReceiveRouter);
app.use('/commuity_receive',commuityReceiveRouter);
app.use('/practice_receive',practiceReceiveRouter);
app.use('/practice_chatting',practiceChatRouter);

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
