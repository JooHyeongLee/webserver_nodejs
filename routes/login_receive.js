let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let sha256 = require('sha256')
let login = require('../function/login');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
router.post('/',function(req,res){
	let id = req.body.login_id;
	let pwd = req.body.login_password;
	//로그인 메소드 호출
	login.loginFunction(id,sha256(pwd),res,req);
})

module.exports = router;
