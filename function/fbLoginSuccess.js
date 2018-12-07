let models=require('../models')
let sha256 = require('sha256')
function fbLoginSuccess(req) {
	models.User.findOne({
		where:{user_id:'fb'+req.session.passport.user.id}
	}).then(function(info){
		models.User.create({
			name: req.session.passport.user.displayName,
			nick: req.session.passport.user.displayName,
			user_id: 'fb'+req.session.passport.user.id,
			password:sha256(req.session.passport.user.id)
		}).catch(function(err){
			console.log('이미 존재함')
		})
	}).catch(function(err){
		console.log(error)
	})

}
exports.fbLoginSuccess = fbLoginSuccess
