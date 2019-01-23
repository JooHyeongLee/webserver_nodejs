let express = require('express')
let app = express();
let router = express.Router();
let models = require('../models');

router.get('/',function(req,res){
	if(req.session.login) {
		models.User.findOne({
			where:{id:req.session.idx} 
		}).then(user=>{
			let info = {'name':user.dataValues.name,'userid':user.dataValues.id};
			res.render('chatting',{data:JSON.stringify(info)});
			server(req,res);
		});
	}
	else {
		res.send("<script>alert('로그인이 필요합니다.')</script><meta http-equiv='refresh' content='0; url=http://localhost:3000/login'</meta>");
	}
})

let server = ((req,res)=>{
	let io = require('socket.io')(req.app.locals.server);
	io.on('connection',socket=>{
		socket.on('login',data=>{
			io.emit('login',data.name);
		})
		socket.on('chat',data=>{
			io.emit('receive',data);
		})
	})
})

module.exports = router;

