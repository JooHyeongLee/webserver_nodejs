let express = require('express')
let fs = require('fs')
let router = express.Router()
let app = express();
let path = require('path')
let passport = require('passport')
let session = require('express-session')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug')
app.use(passport.initialize());
app.use(passport.session());

router.get('/',function(req,res){
	if(req.session.login == undefined){
		req.session.login = false
		req.session.idx = -1
	}
	let images = fs.readdirSync('images')
	images.forEach(function(element,i){
		images[i] = 'images/'+element
	})
	res.render('index',{data:JSON.stringify(images) });
})

module.exports = router;
