let models = require('../models')
let member = require('./singleton')
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
			res.json(responseData);
		}
	});
}

exports.withDrawFunction = withDrawFunction;
