var models=require('../models')
var sha256 = require('sha256')
function fbLoginSuccess(req) {
	models.User.create({
		name: req.session.passport.user.id,
		nick: req.session.passport.user.displayName,
		user_id: 'fb'+req.session.passport.user.id,
		password:sha256(req.session.passport.user.id)
	}).catch(function(err){
		console.log(err)
	})

	models.User.findOne({
		where:{name:req.session.passport.user.id}
	}).then(function(user){
		req.session.idx = user.dataValues.id
	})
}
exports.fbLoginSuccess = fbLoginSuccess
