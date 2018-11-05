var express = require('express')
var router = express.Router()
var app = express();
var passport = require('passport')
var path = require('path')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
app.use(passport.initialize());
app.use(passport.session());

router.get('/',
	passport.authenticate('facebook',{
		successRedirect:'/login_success',
		failureRedirect: '/login_fail'
	})
);

module.exports = router;
