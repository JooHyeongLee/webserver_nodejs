var models = require('../models')
var member = require('./singleton')
function withDrawFunction(idx,res) {
	models.User.destroy({
		where:{
			id:idx
		}
	}).then(function(row){
		if(row==1){
			console.log('Delete');
			responseData = {'result':'ok'}
			member.mId=null; member.mPwd = null; member.mName = null; member.mNick = null;
			member.mIsLogin = false;
			res.json(responseData);
		}
	});
}

exports.withDrawFunction = withDrawFunction;
