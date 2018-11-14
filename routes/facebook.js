let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let passport = require('passport')
let fbLogin = require('../function/fbLogin')
app.set('views',path.join(__dirname+'/views'));
app.set('view engine','pug')
app.use(passport.initialize());
app.use(passport.session());

fbLogin.fbLogin()
router.get('/',passport.authenticate('facebook'));

module.exports = router;
