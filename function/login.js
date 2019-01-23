let models = require('../models');
let sha256 = require('sha256');
let express = require('express')
let app = express()
function loginFunction(id,pwd,res,req){
	let responseData;
	models.User.findOne({
		where: {user_id: id}
	})
	.then(function(user){
		if(user===null || user.dataValues.password!==pwd){
			responseData = {'result':'no','flag':req.session.login};
			res.json(responseData);
			console.log('로그인 실패');
		} 
		else{
			req.session.login = true
			req.session.idx = user.dataValues.id
			responseData = {'result' : 'ok'};
			res.json(responseData);
			console.log('로그인 성공');
		}
	})
		.catch(function(err){
			console.log('오류발생!!')
		})
}

exports.loginFunction = loginFunction;
