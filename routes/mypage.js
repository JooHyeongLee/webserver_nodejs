let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let models = require('../models')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
//app.use(session({
//	secret:'123123123',
//	resave:false,
//	saveUninitialize:true
//}));

router.get('/',function(req,res){
	if(req.session.login){
		models.User.findOne({
			where: {id: req.session.idx}
		}).then(function(info){
			res.render('mypage',{data: JSON.stringify(info.dataValues)});
		})
	}
	else
		res.send("<script>alert('로그인이 필요합니다.')</script><meta http-equiv='refresh' content='0; url=http://localhost:3000/login'</meta>");
})

module.exports = router;
