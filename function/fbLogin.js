var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport')
var response = require('response')
function fbLogin() {
	passport.use(new FacebookStrategy({
		clientID: '324057221510581',
		clientSecret: '6008e2ebceacebb006597e86eac8779e',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
		function (accessToken, refreshToken, profile, done) {
			//console.log(profile)
			done(null,profile)
		}
	));
	// serialize
	// 인증후 사용자 정보를 세션에 저장
	passport.serializeUser(function(user, done) {
		console.log('serialize');
		done(null, user);
	});
	// deserialize
	// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
	passport.deserializeUser(function(user, done) {
		console.log('deserialize');
		done(null, user);
	});
}
exports.fbLogin = fbLogin;
