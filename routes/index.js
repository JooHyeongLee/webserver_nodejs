var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var passport = require('passport')
var session = require('express-session')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug')
app.use(passport.initialize());
app.use(passport.session());

router.get('/',function(req,res){
	if(req.session.login == undefined){
		req.session.login = false
		req.session.idx = -1
	}
	res.render('index');
})

module.exports = router;
