var express = require('express');
var sequelize = require('sequelize');
var parse = require('parse-json');
var app = express();
var fs = require('fs');
var spawn = require('child_process').spawn;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var fb = require('./function/fbLogin')
var passport = require('passport')
//var request = require('request');
//var client = require('cheerio-httpcli');
var language = require('@google-cloud/language');
//templete engine and path
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
	secret:'123123123',
	resave:false,
	saveUninitialize:true
}));
app.use(express.static(__dirname));
app.use(passport.initialize());
app.use(passport.session());
function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/');
}
//singleton
var member = require('./function/singleton');
//comfile function
var comp = require('./function/compiler');
//chatbot function
var chatbot = require('./function/chatBot');
//login function
var login = require('./function/login');
//facebook login success
var fbLogined = require('./function/fbLoginSuccess')
//게시판
var board = require('./function/board');
//enroll Validation function
var validation = require('./function/enrollValidation');
//modify info function
var modifyInfo = require('./function/modifyInfo');
//withdraw function
var withDraw = require('./function/withDraw');
//sha 256 비밀번호 암호화
var sha256 = require('sha256');
// connect To DB
var models = require('./models');
models.sequelize.sync()
	.then(function() {
	console.log('✓ DB connection success.');
	  console.log('  Press CTRL-C to stop\n');
  })
  .catch(function(err) {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

app.get('/about',function(req,res){
	res.render('about');
});
app.get('/practice',function(req,res){
	res.render("practice");
});
app.get('/mypage',function(req,res) {
	if(req.session.login){
		models.User.findOne({
			where: {id: req.session.idx}
		}).then(function(info){
			res.render('mypage',{data: JSON.stringify(info.dataValues)});
		})
	}
	else
		res.send("<script>alert('로그인이 필요합니다.')</script><meta http-equiv='refresh' content='0; url=http://localhost:3000/login'</meta>");
});
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { 
		successRedirect: '/login_success',
		failureRedirect: '/login_fail' 
	})
);
app.get('/login',function(req,res){
	res.render('login');
});
app.get('/login_success', ensureAuthenticated, function(req, res){
	req.session.login = req.isAuthenticated()
	fbLogined.fbLoginSuccess(req)	//db저장
	console.log('성공시 세션값',req.session)
	res.redirect('/index')
});

app.get('/enroll',function(req,res){
	res.render('enroll');
});
app.post('/enroll_receive',function(req,res){
	//name,email,nickname,password,confirm
	console.log(req.body);
	var info = req.body;
	validation.enrollValidation(info,res);
});
app.post('/withdraw_receive',function(req,res){
	withDraw.withDrawFunction(req.body.id,res);
});
app.post('/modifyInfo_receive',function(req,res){
	var info = req.body;
	modifyInfo.modifyInfoFunction(info,res);
});
app.get('/commuity',function(req,res){
	board.boardLoadFunction(function(result){
		var jsonStr = JSON.stringify(result);
		if(result.length==0)
			res.render('commuity',{data:0})
		else
			res.render('commuity',{data:jsonStr})
	})
});
app.get('/commuity/:id',function(req,res){
	var id = req.params.id;
	models.Board.findAll({
		where: {'id':id}
	}).then(function(result){
		var jsonObj = JSON.stringify(result)
		res.render('commuity_detail',{data:jsonObj})
	})
})
app.post('/commuity_search',function(req,res){
	var opt = req.body;
	var word = req.body;
	board.boardSearchFunction(opt,word,function(result,name){
		res.json({
			result: result,
			name: name
		})
	})
})
app.get('/write',function(req,res){
	res.render('write');
});
app.post('/write_receive',function(req,res){
	board.boardWriteFunction(req.body.subject,req.body.content,req.session.idx,function(result){
		res.json(result)
	})	
})
app.get('/logout',function(req,res){
	member.mId=member.mIdx=member.mName=member.mNick=null
	req.session.login = false	//login session 변경
	res.render('index');
});
app.post('/login_receive',function(req,res){
	var id = req.body.login_id;
	var pwd = req.body.login_password;
	var responseData;
	//로그인 메소드 호출
	login.loginFunction(id,sha256(pwd),res,req);
});
app.post('/practice_receive',function(req,res) {
	//var title = req.body.title;
	var language = req.body.language;
	var code = req.body.code;
	var source = code.split(/\r\n|\r\n/).join("\n");
	var source_path = './sources/';	
	//컴파일 메소드 호출
	comp.compileFunction(language,source_path,source,res);
});
app.post('/practice_chatting',function(req,res){
	var chat = req.body.chat;
	chatbot.chatBotFunction(chat,res);
});
app.get('/index',function(req,res){
	if(!req.session.login){
		req.session.login = false
		req.session.idx = -1
	}
	console.log('여기')
	console.log(req.session)
	res.render('index');
});
app.get('/header',function(req,res){
	res.render('header',{login:req.session.login});
});
app.get('/challenge',function(req,res){
	res.render('challenge');
})
app.listen(3000,function(){
	fb.fbLogin()
	console.log('server connected');
});
