var express = require('express')
var router = express.Router()
var app = express();
var session = require('express-session')
var path = require('path')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug')
app.use(session({
	secret:'123123123',
	resave:false,
	saveUninitialize:true
}));

router.get('/',function(req,res){
	if(req.session.login==undefined)
		req.session.login=false
	res.render('header',{login:req.session.login});
})

module.exports = router;
