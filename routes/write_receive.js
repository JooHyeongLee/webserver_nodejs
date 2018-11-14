let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let board = require('../function/board')
let session = require('express-session')
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
