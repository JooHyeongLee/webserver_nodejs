let express = require('express')
let router = express.Router()
let app = express();
let session = require('express-session')
let path = require('path')
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
