var models = require('../models');
var member = require('./singleton');
var sha256 = require('sha256');
member.mIsLogin = false;

function loginFunction(id,pwd,res){
	var responseData;
	models.User.findOne({
		where: {user_id: id}
	})
		.then(function(user){
			if(user==null || user.dataValues.password!=pwd){
				member.mIsLogin=false;
				responseData = {'result':'no','flag':member.mIsLogin};
				res.json(responseData);
				console.log('로그인 실패');
			} 
			else{
				//로그인 성공시 Singleton 객체에 info setting
				member.mIdx = user.dataValues.id;
				member.mIsLogin = true;	
				member.mId = id;
				member.mName = user.dataValues.name;
				member.mNick = user.dataValues.nick;
				responseData = {'result' : 'ok', 'flag':member.mIsLogin};
				res.json(responseData);
				console.log('로그인 성공');
			}
		});
}

exports.loginFunction = loginFunction;
