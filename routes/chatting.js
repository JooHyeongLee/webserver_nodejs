let express = require('express')
let app = express();
let router = express.Router();

router.get('/',function(req,res){
	res.render('chatting');
	server(req,res);
})

let server = ((req,res)=>{
	let io = require('socket.io')(req.app.locals.server);
	io.on('connection',socket=>{
		socket.on('test',data=>{
			io.emit('receive',data);
		})
	})
})

module.exports = router;

