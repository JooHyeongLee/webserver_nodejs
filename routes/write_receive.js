var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var board = require('../function/board')
var session = require('express-session')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
app.use(session({
	secret:'123123123',
	resave:false,
	saveUninitialize:true
}));

router.post('/',function(req,res){
	board.boardWriteFunction(req.body.subject,req.body.content,req.session.idx,function(result){
		res.json(result)
	})	
})

module.exports = router;
