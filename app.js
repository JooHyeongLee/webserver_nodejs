var express = require('express');
var sequelize = require('sequelize');
var parse = require('parse-json');
var app = express();
var fs = require('fs');
var PDK = require('node-pinterest');
var pinterestAPI = require('pinterest-api');
var multer = require('multer');
var _storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'uploads/');
    },
    filename: function(req,file,cb) {
        cb(null,file.originalname);
    }
});
var upload = multer({storage: _storage});
var spawn = require('child_process').spawn;
var bodyParser = require('body-parser');
var weather = require('weather-js');
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//bootstrap
app.use(express.static(__dirname + '/public'));
//singleton
var member = require('./singleton');
member.mIsLogin = false;
//comfile function
var comp = require('./compiler');
//chatbot function
var chatbot = require('./chatBot');
//enroll Validation function
var validation = require('./enrollValidation');
//modify info function
var modifyInfo = require('./modifyInfo');
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

app.get('/image',function(req,res){
	var pinterest = pinterestAPI('godparty');
	pinterest.getPinsFromBoard('project', true, function (pins) {
		console.log(pins.data[0].images);
		var url = pins.data[0].images['237x'].url;
		res.render("image",{data: JSON.stringify(pins)});
	});
});
app.get('/form',function(req,res){
	weather.find({search: 'Seoul',degreeType: 'C'}, function(err,result){
	if(err)
		console.log(err);
	else
		res.render("form",{data: JSON.stringify(result)});
	});
});
app.get('/mypage',function(req,res) {
	if(member.mIsLogin)
		res.render('mypage',{data:JSON.stringify(member)});
	else
		res.send("<script>alert('로그인이 필요합니다.')</script><meta http-equiv='refresh' content='0; url=http://localhost:3000/form'</meta>");
});
app.get('/login',function(req,res){
	res.render('login');
});
app.get('/enroll',function(req,res){
	res.render('enroll');
});
app.post('/enroll_receive',function(req,res){
	//name,email,nickname,password,confirm
	var info = req.body;
	validation.enrollValidation(info,res);
});
app.post('/modifyInfo_receive',function(req,res){
	var info = req.body;
	modifyInfo.modifyInfoFunction(info,res);
});
app.get('/logout',function(req,res){
	member = {};
	member.mIsLogin = false;
	res.redirect('back');
});
app.post('/login_receive',function(req,res){
	var id = req.body.login_id;
	var pwd = req.body.login_password;
	var responseData;
	//DB에서 회원정보 검색
	models.User.findOne({
		where: { user_id: id}
	})
	.then(function(user) {
		if(user==null || user.dataValues.password!=pwd) {
			responseData = {'result' : 'no', 'flag' : member.mIsLogin};
			res.json(responseData);
			console.log('로그인 실패');
		}
		else{
			//로그인 성공시 Singleton 객체에 id,pwd값 setting
			member.mIsLogin = true;	
			member.mId = id;
			member.mPwd = pwd;
			member.mName = user.dataValues.name;
			member.mNick = user.dataValues.nick;
			responseData = {'result' : 'ok', 'flag':member.mIsLogin};
			res.json(responseData);
			console.log('로그인 성공');
		}
	});
});
app.post('/form_receive',function(req,res) {
	//var title = req.body.title;
	var language = req.body.language;
	var code = req.body.code;
	var source = code.split(/\r\n|\r\n/).join("\n");
	var source_path = './sources/';	
	//컴파일 메소드 호출
	comp.compileFunction(language,source_path,source,res);
	//작성 코드 DB에 저장
	models.Code.create( {
		title: 'test',
		code: source 
	}).catch(function(err) {
		console.error(err);
	});
});
app.post('/form_chatting',function(req,res){
	var chat = req.body.chat;
	chatbot.chatBotFunction(chat,res);
});
app.get('/index',function(req,res){
	res.render('index');
});
app.get('/header',function(req,res){
	res.render('header',{login:member.mIsLogin});
});
app.listen(3000,function() {
	console.log('server connected');
});

