var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var member = require('../function/singleton')
var session = require('express-session')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
app.use(session({
	secret:'123123123',
	resave:false,
	saveUninitialize:true
}));

router.get('/',function(req,res){
	member.mId=member.mIdx=member.mName=member.mNick=null
	req.session.destroy(function(){
		req.session;
	})
	res.send("<meta http-equiv='refresh' content='0; url=http://localhost:3000/'</meta>");
})

module.exports = router;
