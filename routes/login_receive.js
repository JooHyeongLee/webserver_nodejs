var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var sha256 = require('sha256')
var login = require('../function/login');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.post('/',function(req,res){
	var id = req.body.login_id;
	var pwd = req.body.login_password;
	var responseData;
	//로그인 메소드 호출
	login.loginFunction(id,sha256(pwd),res,req);
})

module.exports = router;
