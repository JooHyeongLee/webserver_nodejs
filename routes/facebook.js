var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var passport = require('passport')
var fbLogin = require('../function/fbLogin')
app.set('views',path.join(__dirname+'/views'));
app.set('view engine','pug')
app.use(passport.initialize());
app.use(passport.session());

fbLogin.fbLogin()
router.get('/',passport.authenticate('facebook'));

module.exports = router;
