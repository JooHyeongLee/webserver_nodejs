let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let passport = require('passport')
let models = require('../models')
let fbLogined = require('../function/fbLoginSuccess')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
app.use(passport.initialize());
app.use(passport.session());
//app.use(session({
//	secret:'123123123',
//	resave:false,
//	saveUninitialize:true
//}));
function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/');
}

router.get('/',ensureAuthenticated,function(req,res){
	fbLogined.fbLoginSuccess(req)	//db저장
	req.session.login = req.isAuthenticated()
	models.User.findOne({
		where:{user_id: 'fb'+req.session.passport.user.id}
	}).then(function(info){
		req.session.idx = info.dataValues.id
		req.session.save(function(){
			res.send(`
				<script>
				localStorage.login = true
				window.location.href ='/'
				</script>`)
			//res.redirect('/');
		});
	})
})

module.exports = router;
