let express = require('express')
let router = express.Router()
let app = express();
let passport = require('passport')
let path = require('path')
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
