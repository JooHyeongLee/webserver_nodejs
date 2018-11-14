let models = require('../models');
let sha256 = require('sha256');
function modifyInfoFunction(info,res){
	let responseData;
	//공백 체크
	let arr = JSON.stringify(info);
	for(let i=1; i<arr.length; i++){
		if(arr[i-1]=='"' && arr[i]=='"'){
			responseData = {'result':'no','flag':'1'};
			res.send(responseData);
			return;
		}
	}
	//비밀번호 불일치
	if(info.password !=info.confirm){
		responseData = {'result':'no','flag':'2'};
		res.send(responseData);
		return;
	}
	models.User.update(
		{name: info.name, nick: info.nickname, password: sha256(info.password)},
		{where: {user_id: info.email} }
	);
	responseData = {'result':'ok'};
	res.send(responseData);
}
exports.modifyInfoFunction = modifyInfoFunction;
