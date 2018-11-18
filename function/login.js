let models = require('../models');
let member = require('./singleton');
let sha256 = require('sha256');
let express = require('express')
let app = express()
const session = require('express-session')
app.use(session({
	secret:'123123123',
	resave:false,
	saveUninitialize:true
}));
function loginFunction(id,pwd,res,req){
	let responseData;
	models.User.findOne({
		where: {user_id: id}
	})
		.then(function(user){
			if(user==null || user.dataValues.password!=pwd){
				responseData = {'result':'no','flag':req.session.login};
				res.json(responseData);
				console.log('로그인 실패');
			} 
			else{
				member.mIdx = user.dataValues.id;
				req.session.login = true
				req.session.idx = user.dataValues.id
				member.mId = id;
				member.mName = user.dataValues.name;
				member.mNick = user.dataValues.nick;
				responseData = {'result' : 'ok'};
				console.log(req.session)
				res.json(responseData);
				console.log('로그인 성공');
			}
		});
}

exports.loginFunction = loginFunction;
